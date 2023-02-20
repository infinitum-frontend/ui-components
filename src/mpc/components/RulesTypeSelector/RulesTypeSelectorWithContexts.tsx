import React from 'react'

// import cn from 'classnames';
// import styles from './RulesTypeSelector.module.css';

import { RulesTypesEnum } from '../../domain/enums/rulesTypes'
import { useDispatchContext } from '../../contexts/dispatch.context'

import RulesTypeSelector, { IRulesTypeSelectProps } from './RulesTypeSelector'
import { ActionTypesEnum } from '../../domain/PortfolioRules/PortfolioRules.reducer'

export default function RulesTypeSelectorWithContexts(
  props: IRulesTypeSelectProps
): React.ReactElement {
  const dispatch = useDispatchContext()

  const onChange = (nextRuleType: RulesTypesEnum): void => {
    dispatch({
      type: ActionTypesEnum.changeCurrentRuleType,
      payload: { nextCurrentRuleType: nextRuleType }
    })
  }

  return <RulesTypeSelector {...props} onChange={onChange} />
}
