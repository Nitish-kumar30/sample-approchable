'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  EVENT_TYPE_LABELS,
  MENTOR_CALENDAR_NOTE,
  MENTOR_WEEKS,
  formatEventDate,
  formatWeekRange,
  getEventsForWeek,
  getFeaturedEventId,
  getWeekByNumber,
  getWeekDays,
  type MentorEventType,
} from '@/data/mentor-calendar';
import styles from '@/app/mentor-calendar/mentor-calendar.module.css';

const WEEK_COUNT = MENTOR_WEEKS.length;

function typeClass(type: MentorEventType): string {
  if (type === 'live') return styles.typeLive;
  if (type === 'office-hours') return styles.typeOffice;
  if (type === 'assignment') return styles.typeAssignment;
  return styles.typeCapstone;
}

export default function MentorCalendar() {
  const [weekNumber, setWeekNumber] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(() => getFeaturedEventId(1));
  const tabsRef = useRef<HTMLDivElement>(null);
  const skipTabFocus = useRef(true);

  useEffect(() => {
    if (skipTabFocus.current) {
      skipTabFocus.current = false;
      return;
    }
    const selected = tabsRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    selected?.focus();
  }, [weekNumber]);

  const week = getWeekByNumber(weekNumber) ?? MENTOR_WEEKS[0];
  const days = useMemo(() => getWeekDays(week.week), [week.week]);
  const weekEvents = useMemo(() => getEventsForWeek(week.week), [week.week]);
  const visibleEvents = selectedDate
    ? weekEvents.filter((event) => event.date === selectedDate)
    : weekEvents;

  const goToWeek = (nextWeek: number) => {
    const clamped = Math.min(WEEK_COUNT, Math.max(1, nextWeek));
    if (clamped === weekNumber) return;
    setWeekNumber(clamped);
    setSelectedDate(null);
    setExpandedId(getFeaturedEventId(clamped));
  };

  const onWeekTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goToWeek(weekNumber + 1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goToWeek(weekNumber - 1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goToWeek(1);
    }
    if (event.key === 'End') {
      event.preventDefault();
      goToWeek(WEEK_COUNT);
    }
  };

  const onDayClick = (date: string, hasEvents: boolean) => {
    if (!hasEvents) return;
    const next = selectedDate === date ? null : date;
    const source = next ? weekEvents.filter((event) => event.date === next) : weekEvents;
    setSelectedDate(next);
    setExpandedId(source[0]?.id ?? getFeaturedEventId(weekNumber));
  };

  const toggleEvent = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className={styles.calendarBoard}>
      <p className={styles.sampleBanner} role="note">
        {MENTOR_CALENDAR_NOTE}
      </p>

      <div className={styles.weekNav}>
        <button
          type="button"
          className={styles.weekArrow}
          onClick={() => goToWeek(weekNumber - 1)}
          disabled={weekNumber === 1}
          aria-label="Previous week"
        >
          ‹
        </button>

        <div
          className={styles.weekTabs}
          ref={tabsRef}
          role="tablist"
          aria-label="Cohort weeks"
          onKeyDown={onWeekTabKeyDown}
        >
          {MENTOR_WEEKS.map((item) => {
            const selected = item.week === weekNumber;
            return (
              <button
                key={item.week}
                type="button"
                role="tab"
                id={`week-tab-${item.week}`}
                aria-selected={selected}
                aria-controls="week-panel"
                tabIndex={selected ? 0 : -1}
                className={`${styles.weekTab} ${selected ? styles.weekTabActive : ''}`}
                onClick={() => goToWeek(item.week)}
              >
                Week {item.week}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.weekArrow}
          onClick={() => goToWeek(weekNumber + 1)}
          disabled={weekNumber === WEEK_COUNT}
          aria-label="Next week"
        >
          ›
        </button>
      </div>

      <div
        id="week-panel"
        role="tabpanel"
        aria-labelledby={`week-tab-${week.week}`}
        className={styles.weekPanel}
      >
        <div className={styles.weekIntro}>
          <div className={styles.weekKicker}>
            Week {week.week} · {formatWeekRange(week)}
          </div>
          <h3 className={styles.weekTitle}>{week.title}</h3>
          <p className={styles.weekTheme}>{week.theme}</p>
        </div>

        <div className={styles.dayStrip} role="list" aria-label={`Days in week ${week.week}`}>
          {days.map((day) => {
            const selected = selectedDate === day.date;
            return (
              <button
                key={day.date}
                type="button"
                role="listitem"
                className={`${styles.dayCell} ${day.hasEvents ? styles.dayHasEvents : ''} ${selected ? styles.daySelected : ''}`}
                onClick={() => onDayClick(day.date, day.hasEvents)}
                aria-pressed={selected}
                aria-disabled={!day.hasEvents}
                disabled={!day.hasEvents}
              >
                <span className={styles.dayWeekday}>{day.weekday}</span>
                <span className={styles.dayNumber}>
                  {day.dayNumber}
                  <span className={styles.dayMonth}>{day.monthShort}</span>
                </span>
                {day.hasEvents && <span className={styles.dayDot} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <button type="button" className={styles.clearDay} onClick={() => setSelectedDate(null)}>
            Show all of week {week.week}
          </button>
        )}

        <ul className={styles.eventList}>
          {visibleEvents.map((event) => {
            const expanded = expandedId === event.id;
            const panelId = `event-panel-${event.id}`;
            return (
              <li key={event.id}>
                <article className={`${styles.eventCard} ${event.featured ? styles.eventFeatured : ''}`}>
                  <button
                    type="button"
                    className={styles.eventToggle}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggleEvent(event.id)}
                  >
                    <div className={styles.eventMeta}>
                      <span className={`${styles.typeTag} ${typeClass(event.type)}`}>
                        {EVENT_TYPE_LABELS[event.type]}
                      </span>
                      {event.featured && <span className={styles.featuredTag}>Featured</span>}
                    </div>
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    <p className={styles.eventWhen}>
                      {formatEventDate(event.date)} · {event.time} · {event.duration}
                    </p>
                    <span className={styles.eventHint}>{expanded ? 'Hide details' : 'Show details'}</span>
                  </button>
                  {expanded && (
                    <div id={panelId} className={styles.eventBody}>
                      <p>{event.summary}</p>
                      <div className={styles.topicList}>
                        {event.topics.map((topic) => (
                          <span key={topic} className={styles.topic}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
