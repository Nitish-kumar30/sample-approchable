'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import {
  OFFERING_FILTERS,
  OFFERING_LABELS,
  STATUS_LABELS,
  STATUS_LEGEND,
  WEEKDAY_SHORT,
  deriveWindowStatus,
  formatMonthTitle,
  formatWindowDates,
  getDefaultMonthKey,
  getFeaturedWindowId,
  getMonthBounds,
  getMonthGrid,
  getOffering,
  getWindowsForFilter,
  getWindowsForMonth,
  shiftMonth,
  type OfferingFilter,
  type OfferingId,
  type WindowStatus,
} from '@/data/mentor-calendar';
import styles from '@/app/mentor-calendar/mentor-calendar.module.css';

function offeringClass(id: OfferingId): string {
  if (id === 'team-training') return styles.typeTeam;
  if (id === 'one-on-one') return styles.typeOne;
  return styles.typeCohort;
}

function statusClass(status: WindowStatus): string {
  if (status === 'open') return styles.statusOpen;
  if (status === 'limited') return styles.statusLimited;
  if (status === 'waitlist') return styles.statusWaitlist;
  if (status === 'full') return styles.statusFull;
  return styles.statusClosed;
}

function dotClass(id: OfferingId): string {
  if (id === 'team-training') return styles.dotTeam;
  if (id === 'one-on-one') return styles.dotOne;
  return styles.dotCohort;
}

export default function MentorCalendar() {
  const [filter, setFilter] = useState<OfferingFilter>('all');
  const [monthKey, setMonthKey] = useState(() => getDefaultMonthKey());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const bounds = useMemo(() => getMonthBounds(), []);
  const filterWindows = useMemo(() => getWindowsForFilter(filter), [filter]);
  const monthWindows = useMemo(
    () => getWindowsForMonth(filterWindows, monthKey, selectedDate),
    [filterWindows, monthKey, selectedDate],
  );
  const gridCells = useMemo(() => getMonthGrid(monthKey, filterWindows), [monthKey, filterWindows]);

  const featuredId = getFeaturedWindowId(monthWindows);
  const activeExpanded = expandedId && monthWindows.some((window) => window.id === expandedId)
    ? expandedId
    : featuredId;

  const goToMonth = (nextKey: string) => {
    if (nextKey < bounds.min || nextKey > bounds.max) return;
    setMonthKey(nextKey);
    setSelectedDate(null);
    setExpandedId(null);
  };

  const onFilterChange = (next: OfferingFilter) => {
    setFilter(next);
    setSelectedDate(null);
    const windows = getWindowsForFilter(next);
    const stillInMonth = getWindowsForMonth(windows, monthKey);
    if (stillInMonth.length === 0 && windows[0]) {
      setMonthKey(windows[0].startDate.slice(0, 7));
    }
    setExpandedId(null);
  };

  const onFilterKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = OFFERING_FILTERS.findIndex((item) => item.id === filter);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      onFilterChange(OFFERING_FILTERS[Math.min(OFFERING_FILTERS.length - 1, index + 1)].id);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      onFilterChange(OFFERING_FILTERS[Math.max(0, index - 1)].id);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      onFilterChange(OFFERING_FILTERS[0].id);
    }
    if (event.key === 'End') {
      event.preventDefault();
      onFilterChange(OFFERING_FILTERS[OFFERING_FILTERS.length - 1].id);
    }
  };

  const onDayClick = (date: string, hasWindows: boolean) => {
    if (!hasWindows) return;
    const next = selectedDate === date ? null : date;
    setSelectedDate(next);
    const source = getWindowsForMonth(filterWindows, monthKey, next);
    setExpandedId(getFeaturedWindowId(source));
  };

  const emptyOffering = filter === 'all' ? null : getOffering(filter);

  return (
    <div className={styles.calendarBoard}>
      <div className={styles.legend} role="note">
        {STATUS_LEGEND.map((status) => (
          <span key={status} className={`${styles.statusTag} ${statusClass(status)}`}>
            {STATUS_LABELS[status]}
          </span>
        ))}
      </div>

      <div className={styles.filterNav}>
        <button
          type="button"
          className={styles.weekArrow}
          onClick={() => goToMonth(shiftMonth(monthKey, -1))}
          disabled={monthKey <= bounds.min}
          aria-label="Previous month"
        >
          ‹
        </button>

        <div
          className={styles.filterTabs}
          role="tablist"
          aria-label="Offering type"
          onKeyDown={onFilterKeyDown}
        >
          {OFFERING_FILTERS.map((item) => {
            const selected = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`offering-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="availability-panel"
                tabIndex={selected ? 0 : -1}
                className={`${styles.filterTab} ${selected ? styles.filterTabActive : ''}`}
                onClick={() => onFilterChange(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.weekArrow}
          onClick={() => goToMonth(shiftMonth(monthKey, 1))}
          disabled={monthKey >= bounds.max}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div
        id="availability-panel"
        role="tabpanel"
        aria-labelledby={`offering-tab-${filter}`}
        className={styles.weekPanel}
      >
        <div className={styles.weekIntro}>
          <div className={styles.weekKicker}>Availability</div>
          <h3 className={styles.weekTitle}>{formatMonthTitle(monthKey)}</h3>
          <p className={styles.weekTheme}>
            {filter === 'all'
              ? 'Team training, 1-1, and the live cohort — click a day with a dot to filter.'
              : `${OFFERING_LABELS[filter]} windows this month. Request a window and dates are confirmed after the enquiry.`}
          </p>
        </div>

        <div className={styles.monthWeekdays} aria-hidden="true">
          {WEEKDAY_SHORT.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className={styles.monthGrid} role="list" aria-label={`Days in ${formatMonthTitle(monthKey)}`}>
          {gridCells.map((cell) => {
            const hasWindows = cell.offerings.length > 0;
            const selected = selectedDate === cell.date;
            return (
              <button
                key={cell.date}
                type="button"
                role="listitem"
                className={`${styles.dayCell} ${cell.inMonth ? '' : styles.dayOutside} ${hasWindows ? styles.dayHasEvents : ''} ${selected ? styles.daySelected : ''}`}
                onClick={() => onDayClick(cell.date, hasWindows)}
                aria-pressed={selected}
                aria-disabled={!hasWindows}
                disabled={!hasWindows}
              >
                <span className={styles.dayNumber}>{cell.dayNumber}</span>
                {hasWindows && (
                  <span className={styles.dayDots}>
                    {cell.offerings.map((offering) => (
                      <span key={offering} className={`${styles.dayDot} ${dotClass(offering)}`} />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <button type="button" className={styles.clearDay} onClick={() => setSelectedDate(null)}>
            Show all of {formatMonthTitle(monthKey)}
          </button>
        )}

        {monthWindows.length === 0 ? (
          <div className={styles.emptyState}>
            <p>
              {emptyOffering
                ? emptyOffering.emptyMessage
                : `No open windows in ${formatMonthTitle(monthKey)}. Try another month.`}
            </p>
            {emptyOffering && (
              <Link className={`${styles.btn} ${styles.btnSecondary}`} href={emptyOffering.href}>
                {emptyOffering.ctaLabel}
              </Link>
            )}
          </div>
        ) : (
          <ul className={styles.eventList}>
            {monthWindows.map((window) => {
              const expanded = activeExpanded === window.id;
              const panelId = `window-panel-${window.id}`;
              const status = deriveWindowStatus(window);
              const offering = getOffering(window.offering);
              return (
                <li key={window.id}>
                  <article className={`${styles.eventCard} ${window.featured ? styles.eventFeatured : ''}`}>
                    <button
                      type="button"
                      className={styles.eventToggle}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setExpandedId(expanded ? null : window.id)}
                    >
                      <div className={styles.eventMeta}>
                        <span className={`${styles.typeTag} ${offeringClass(window.offering)}`}>
                          {OFFERING_LABELS[window.offering]}
                        </span>
                        <span className={`${styles.statusTag} ${statusClass(status)}`}>
                          {STATUS_LABELS[status]}
                        </span>
                      </div>
                      <h4 className={styles.eventTitle}>{window.title}</h4>
                      <p className={styles.eventWhen}>
                        {formatWindowDates(window)}
                        {window.seatsNote ? ` · ${window.seatsNote}` : ''}
                      </p>
                      <span className={styles.eventHint}>{expanded ? 'Hide details' : 'Show details'}</span>
                    </button>
                    {expanded && (
                      <div id={panelId} className={styles.eventBody}>
                        <p>{window.summary}</p>
                        {window.timezone && (
                          <div className={styles.topicList}>
                            <span className={styles.topic}>{window.timezone}</span>
                          </div>
                        )}
                        <Link className={`${styles.btn} ${styles.btnPrimary} ${styles.windowCta}`} href={offering.href}>
                          Request this window
                        </Link>
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
