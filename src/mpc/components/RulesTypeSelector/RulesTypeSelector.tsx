import React from 'react'

import cn from 'classnames'
import styles from './RulesTypeSelector.module.css'

enum RulesTypesEnum {
  'structureRuleVerifications' = 'structureRuleVerifications',
  'structureOverTimeRuleVerifications' = 'structureOverTimeRuleVerifications',
  'compositionRuleVerifications' = 'compositionRuleVerifications',
  'participationRuleVerifications' = 'participationRuleVerifications',
  'otherRuleVerifications' = 'otherRuleVerifications'
}

const TypeSelectorTitles = {
  all: 'Все показатели',
  structure: 'Контроль структуры',
  structureOverTime: 'Статистический',
  composition: 'Cостава',
  participation: 'Cостава по доле владения',
  other: 'Иной'
}

const RulesTypesTitles: { [key in RulesTypesEnum]: string } = {
  [RulesTypesEnum.structureRuleVerifications]: TypeSelectorTitles.structure,
  [RulesTypesEnum.structureOverTimeRuleVerifications]:
    TypeSelectorTitles.structureOverTime,
  [RulesTypesEnum.compositionRuleVerifications]: TypeSelectorTitles.composition,
  [RulesTypesEnum.participationRuleVerifications]:
    TypeSelectorTitles.participation,
  [RulesTypesEnum.otherRuleVerifications]: TypeSelectorTitles.other
}

export interface IRulesTypeSelectProps {
  className?: string
  role?: string
  data?: {
    rulesType: RulesTypesEnum
  }
  onChange?: (arg0: RulesTypesEnum) => void
}

export default function RulesTypeSelector(
  props: IRulesTypeSelectProps
): React.ReactElement {
  const {
    className,
    role = 'selector',
    data = {
      rulesType: RulesTypesEnum.structureRuleVerifications
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    ...attributes
  } = props

  const typesKeys = Object.keys(RulesTypesTitles) as Array<keyof RulesTypesEnum>

  return (
    <>
      <div {...attributes} role={role} className={cn(styles.body, className)}>
        {typesKeys.map((key) => {
          const ruleTypeKey = key as RulesTypesEnum
          return (
            <div className={styles.buttonBlock} key={ruleTypeKey}>
              <button
                type="button"
                aria-label="selector-tab"
                className={cn(
                  styles.button,
                  // remove to see disabled state
                  styles.hasRules,
                  ruleTypeKey === data.rulesType && styles.buttonActive
                )}
                onClick={() => onChange(ruleTypeKey)}
              >
                {RulesTypesTitles[ruleTypeKey]}
              </button>
            </div>
          )
        })}
      </div>

      <div className={cn(styles.bottomLineBody)}>
        <hr className={styles.bottomLine} />
      </div>
    </>
  )
}
