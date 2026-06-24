export interface NavBarItem {
  id: number;
  title: string,
  route: string,
  icon: string,
  active:boolean
}

export interface ProfileInfo {
  label: string,
  value: string,
  icon: string
}

export interface DiagnosisList {
  id: number
  name: string,
  description: string,
  status: string,
}

export interface LabResult {
  id: number
  test: string,
}

export interface statusCard {
    value: number,
  levels: string
}

 