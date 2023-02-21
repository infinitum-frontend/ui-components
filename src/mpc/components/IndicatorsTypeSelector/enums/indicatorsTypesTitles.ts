enum IndicatorsGroupsEnum {
  'all' = '',
  'structure' = 'Structure',
  'structureOverTime' = 'StructureOverTime',
  'composition' = 'Composition',
  'participation' = 'Participation',
  'other' = 'Other'
}
const TypeSelectorTitles = {
  all: 'Все показатели',
  structure: 'Контроль структуры',
  structureOverTime: 'Статистический',
  composition: 'Cостава',
  participation: 'Cостава по доле владения',
  other: 'Иной'
}

export const IndicatorsGroupsTitles: { [key in IndicatorsGroupsEnum]: string } =
  {
    [IndicatorsGroupsEnum.all]: TypeSelectorTitles.all,
    [IndicatorsGroupsEnum.structure]: TypeSelectorTitles.structure,
    [IndicatorsGroupsEnum.structureOverTime]:
      TypeSelectorTitles.structureOverTime,
    [IndicatorsGroupsEnum.composition]: TypeSelectorTitles.composition,
    [IndicatorsGroupsEnum.participation]: TypeSelectorTitles.participation,
    [IndicatorsGroupsEnum.other]: TypeSelectorTitles.other
  }
