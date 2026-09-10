'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  CURRICULUM_NOTE,
  GENERAL_CURRICULUM,
  ITEM_TYPE_LABELS,
  getFeaturedItemId,
  getWeekByNumber,
  type CurriculumItemType,
} from '@/data/one-on-one';
import styles from '@/app/one-on-one-ai-training/one-on-one-ai-training.module.css';

const WEEK_COUNT = GENERAL_CURRICULUM.length;

function typeClass(type: CurriculumItemType): string {
  if (type === 'live') return styles.typeLive;
  if (type === 'preread') return styles.typePreread;
  if (type === 'quiz') return styles.typeQuiz;
  if (type === 'assignment') return styles.typeAssignment;
  return styles.typeCapstone;
}

export default function OneOnOneCurriculum() {
  const [weekNumber, setWeekNumber] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(() => getFeaturedItemId(1));
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

  const week = getWeekByNumber(weekNumber) ?? GENERAL_CURRICULUM[0];

  const goToWeek = (nextWeek: number) => {
    const clamped = Math.min(WEEK_COUNT, Math.max(1, nextWeek));
    if (clamped === weekNumber) return;
    setWeekNumber(clamped);
    setExpandedId(getFeaturedItemId(clamped));
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

  const toggleItem = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className={styles.curriculumBoard}>
      <p className={styles.sampleBanner} role="note">
        {CURRICULUM_NOTE}
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
          aria-label="Training weeks"
          onKeyDown={onWeekTabKeyDown}
        >
          {GENERAL_CURRICULUM.map((item) => {
            const selected = item.week === weekNumber;
            return (
              <button
                key={item.week}
                type="button"
                role="tab"
                id={`ooo-week-tab-${item.week}`}
                aria-selected={selected}
                aria-controls="ooo-week-panel"
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
        id="ooo-week-panel"
        role="tabpanel"
        aria-labelledby={`ooo-week-tab-${week.week}`}
        className={styles.weekPanel}
      >
        <div className={styles.weekIntro}>
          <div className={styles.weekKicker}>Week {week.week} of {WEEK_COUNT}</div>
          <h3 className={styles.weekTitle}>{week.title}</h3>
          <p className={styles.weekTheme}>{week.theme}</p>
        </div>

        <ul className={styles.eventList}>
          {week.items.map((item) => {
            const expanded = expandedId === item.id;
            const panelId = `ooo-item-${item.id}`;
            return (
              <li key={item.id}>
                <article className={`${styles.eventCard} ${item.featured ? styles.eventFeatured : ''}`}>
                  <button
                    type="button"
                    className={styles.eventToggle}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className={styles.eventMeta}>
                      <span className={`${styles.typeTag} ${typeClass(item.type)}`}>
                        {ITEM_TYPE_LABELS[item.type]}
                      </span>
                      {item.customOnly && <span className={styles.customTag}>Custom package</span>}
                      {item.featured && <span className={styles.featuredTag}>Live demo</span>}
                    </div>
                    <h4 className={styles.eventTitle}>{item.title}</h4>
                    {item.duration && <p className={styles.eventWhen}>{item.duration}</p>}
                    <span className={styles.eventHint}>{expanded ? 'Hide details' : 'Show details'}</span>
                  </button>
                  {expanded && (
                    <div id={panelId} className={styles.eventBody}>
                      <p>{item.summary}</p>
                      <div className={styles.topicList}>
                        {item.topics.map((topic) => (
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
