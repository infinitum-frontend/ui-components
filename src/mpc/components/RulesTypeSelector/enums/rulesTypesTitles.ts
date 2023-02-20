import { RulesTypesEnum } from '../../../domain/enums/rulesTypes'
import TypeSelectorTitles from '../../../../../../../libs/enums/TypeSelectorTitles'

export const RulesTypesTitles: { [key in RulesTypesEnum]: string } = {
  [RulesTypesEnum.structureRuleVerifications]: TypeSelectorTitles.structure,
  [RulesTypesEnum.structureOverTimeRuleVerifications]:
    TypeSelectorTitles.structureOverTime,
  [RulesTypesEnum.compositionRuleVerifications]: TypeSelectorTitles.composition,
  [RulesTypesEnum.participationRuleVerifications]:
    TypeSelectorTitles.participation,
  [RulesTypesEnum.otherRuleVerifications]: TypeSelectorTitles.other
}
