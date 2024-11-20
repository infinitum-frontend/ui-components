export interface NpfRule {
  id: number
  portfoliosCount: number
  verificationAutomationDate?: string | null
  mandatoryAutoAssignmentSettings?: NpfAutoAssignmentSettingsShort[]
  shortName?: string
  officialName?: string
  normativeAct?: string
  type: IndicatorsTypesEnum
}

export enum IndicatorsTypesEnum {
  'Structure' = 'Structure',
  'AssetStructure' = 'AssetStructure',
  'AssetsGroupStructure' = 'AssetsGroupStructure',
  'IndexFundStructure' = 'IndexFundStructure',
  'IssuerStructure' = 'IssuerStructure',
  'Participation' = 'Participation',
  'Composition' = 'Composition',
  'AssetComposition' = 'AssetComposition',
  'StructureOverTime' = 'StructureOverTime',
  'Other' = 'Other'
}

export enum FundPurposeTypeEnum {
  Unknown = 'Unknown',
  PensionReserves = 'PensionReserves',
  PensionSavings = 'PensionSavings',
  Oef = 'Oef', // Не встретится в НПФ = Не упоминать в фильтрах
  OwnFunds = 'OwnFunds'
}

export enum PortfolioTypeEnum {
  Unknown = 'Unknown',
  TrustManagement = 'TrustManagement',
  SelfManagement = 'SelfManagement',
  Aggregate = 'Aggregate'
}

export interface NpfAutoAssignmentSettingsShort {
  fundPurposeType: FundPurposeTypeEnum
  portfolioType: PortfolioTypeEnum
}
