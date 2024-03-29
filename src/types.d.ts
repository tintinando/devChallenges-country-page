interface Filter {
  sortBy: keyof RootObject | null
  region: string[]
  keys: string
  UNMember: boolean
  independent: boolean
}
