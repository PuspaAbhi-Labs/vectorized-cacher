export class Parser {

}

export const tokens = ['GET', 'SET', 'DELETE'] as const

// structure: $token $key $value?
// key is always needed, but value is optional for some commands/tokens
// e.g. GET foo
// e.g. SET foo bar
// e.g. DELETE foo