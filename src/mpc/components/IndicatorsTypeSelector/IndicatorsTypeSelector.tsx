import React from 'react'

import cn from 'classnames'
import styles from './IndicatorsTypeSelector.module.css'

import { IndicatorsGroupsTitles } from './enums/indicatorsTypesTitles'

enum IndicatorsGroupsEnum {
  'all' = '',
  'structure' = 'Structure',
  'structureOverTime' = 'StructureOverTime',
  'composition' = 'Composition',
  'participation' = 'Participation',
  'other' = 'Other'
}

export interface IRulesTypeSelectProps {
  className?: string
  role?: string
  data?: {
    indicatorGroup: IndicatorsGroupsEnum
    indicatorsCount: { [key in IndicatorsGroupsEnum]: number }
  }
  onChange?: (arg0: IndicatorsGroupsEnum) => void
}

export default function IndicatorsTypeSelector(
  props: IRulesTypeSelectProps
): React.ReactElement {
  const {
    className,
    role = 'selector',
    data = {
      indicatorGroup: IndicatorsGroupsEnum.all,
      indicatorsCount: {
        [IndicatorsGroupsEnum.all]: 0,
        [IndicatorsGroupsEnum.structure]: 0,
        [IndicatorsGroupsEnum.structureOverTime]: 0,
        [IndicatorsGroupsEnum.composition]: 0,
        [IndicatorsGroupsEnum.participation]: 0,
        [IndicatorsGroupsEnum.other]: 0
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    ...attributes
  } = props

  const typesKeys = Object.keys(IndicatorsGroupsTitles) as Array<
    keyof IndicatorsGroupsEnum
  >

  return (
    <>
      <div
        {...attributes}
        role={role}
        className={cn(styles.container, className)}
      >
        {typesKeys.map((key) => {
          const indicatorTypeKey = key as IndicatorsGroupsEnum
          return (
            <button
              type="button"
              aria-label="selector-tab"
              key={indicatorTypeKey}
              className={cn(
                styles.btn,
                // remove to see disabled state
                styles.hasRules,
                indicatorTypeKey === data.indicatorGroup && styles.btnActive
              )}
              onClick={() => onChange(indicatorTypeKey)}
            >
              {IndicatorsGroupsTitles[indicatorTypeKey]}
            </button>
          )
        })}
      </div>

      <div className={cn(styles.bottomLineBody)}>
        <hr className={styles.bottomLine} />
      </div>
    </>
  )
}
