import { IndicatorsTypesEnum, NpfRule } from './types'

export const NPF_RULES_TABLE_DATA: NpfRule[] = [
  {
    id: 121,
    shortName:
      'Один Срок предоставления специализированному депозитарию документа (документов), включая изменения и дополнения к документу (документам) (копий документов) и/или сведений (информации)',
    type: IndicatorsTypesEnum.AssetComposition,
    portfoliosCount: 10,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  },
  {
    id: 146,
    shortName:
      'Два Срок предоставления специализированному депозитарию документа (документов), включая изменения и дополнения к документу (документам) (копий документов) и/или сведений (информации)',
    type: IndicatorsTypesEnum.AssetComposition,
    portfoliosCount: 234,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  },
  {
    id: 141,
    shortName:
      'Три Срок предоставления специализированному депозитарию документа (документов), включая изменения и дополнения к документу (документам) (копий документов) и/или сведений (информации)',
    type: IndicatorsTypesEnum.Structure,
    portfoliosCount: 0,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  },
  {
    id: 200,
    shortName:
      'Четыре Срок предоставления специализированному депозитарию документа (документов), включая изменения и дополнения к документу (документам) (копий документов) и/или сведений (информации)',
    type: IndicatorsTypesEnum.Other,
    portfoliosCount: 3,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  }
]
