export interface Disability {
  Id: number,
  Name: string,
  FederationId: number,
  isGsport: boolean
  PersonDisabilityDegree: Array<PersonDisabilityDegree>
}

export interface PersonDisabilityDegree {
  Id: number,
  Name: string
}

export type Disabilities = [Disability];
