import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface Article {
    comments: Comment[]
    id: Scalars['ID']
    title: Scalars['String']
    url: Scalars['String']
    __typename: 'Article'
}

export interface Comment {
    id: Scalars['ID']
    text: Scalars['String']
    __typename: 'Comment'
}

export interface CommentRemoved {
    success: Scalars['Boolean']
    __typename: 'CommentRemoved'
}

export interface Mutation {
    addComment: Comment
    createArticle: Article
    removeComment: CommentRemoved
    updateComment: Comment
    __typename: 'Mutation'
}

export interface Query {
    article: Article
    articles: Article[]
    __typename: 'Query'
}

export interface ArticleRequest{
    comments?: CommentRequest
    id?: boolean | number
    title?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentRequest{
    id?: boolean | number
    text?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface CommentRemovedRequest{
    success?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    addComment?: [{articleID: Scalars['String'],text: Scalars['String']},CommentRequest]
    createArticle?: [{title: Scalars['String'],url: Scalars['String']},ArticleRequest]
    removeComment?: [{articleID: Scalars['String'],commentID: Scalars['String']},CommentRemovedRequest]
    updateComment?: [{articleID: Scalars['String'],commentID: Scalars['String'],text: Scalars['String']},CommentRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    article?: [{articleID: Scalars['String']},ArticleRequest]
    articles?: ArticleRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Article_possibleTypes: string[] = ['Article']
export const isArticle = (obj?: { __typename?: any } | null): obj is Article => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isArticle"')
  return Article_possibleTypes.includes(obj.__typename)
}



const Comment_possibleTypes: string[] = ['Comment']
export const isComment = (obj?: { __typename?: any } | null): obj is Comment => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
}



const CommentRemoved_possibleTypes: string[] = ['CommentRemoved']
export const isCommentRemoved = (obj?: { __typename?: any } | null): obj is CommentRemoved => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isCommentRemoved"')
  return CommentRemoved_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface ArticlePromiseChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface ArticleObservableChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CommentPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CommentObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface CommentRemovedPromiseChain{
    success: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}

export interface CommentRemovedObservableChain{
    success: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
}

export interface MutationPromiseChain{
    addComment: ((args: {articleID: Scalars['String'],text: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    removeComment: ((args: {articleID: Scalars['String'],commentID: Scalars['String']}) => CommentRemovedPromiseChain & {get: <R extends CommentRemovedRequest>(request: R, defaultValue?: FieldsSelection<CommentRemoved, R>) => Promise<FieldsSelection<CommentRemoved, R>>}),
    updateComment: ((args: {articleID: Scalars['String'],commentID: Scalars['String'],text: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>})
}

export interface MutationObservableChain{
    addComment: ((args: {articleID: Scalars['String'],text: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    createArticle: ((args: {title: Scalars['String'],url: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    removeComment: ((args: {articleID: Scalars['String'],commentID: Scalars['String']}) => CommentRemovedObservableChain & {get: <R extends CommentRemovedRequest>(request: R, defaultValue?: FieldsSelection<CommentRemoved, R>) => Observable<FieldsSelection<CommentRemoved, R>>}),
    updateComment: ((args: {articleID: Scalars['String'],commentID: Scalars['String'],text: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>})
}

export interface QueryPromiseChain{
    article: ((args: {articleID: Scalars['String']}) => ArticlePromiseChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Promise<FieldsSelection<Article, R>>}),
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Promise<FieldsSelection<Article, R>[]>})
}

export interface QueryObservableChain{
    article: ((args: {articleID: Scalars['String']}) => ArticleObservableChain & {get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>) => Observable<FieldsSelection<Article, R>>}),
    articles: ({get: <R extends ArticleRequest>(request: R, defaultValue?: FieldsSelection<Article, R>[]) => Observable<FieldsSelection<Article, R>[]>})
}