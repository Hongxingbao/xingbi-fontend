declare namespace API {
  type analysisByAsyncMqUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    goal?: string;
  };

  type analysisByAsyncUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    goal?: string;
  };

  type analysisBySynchronizeUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    goal?: string;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    chartId?: string;
    genChart?: JSON;
    genResult?: string;
  };

  type Chart = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    status?: string;
    updateTime?: string;
    userId?: string;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    goal?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    goal?: string;
    id?: string;
  };

  type ChartQueryRequest = {
    chartName?: string;
    chartType?: string;
    current?: string;
    goal?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
  };

  type chatContStreamUsingGETParams = {
    /** msg */
    msg: string;
    /** msgUid */
    msgUid: string;
  };

  type chatContUsingPOSTParams = {
    /** msg */
    msg?: string;
  };

  type ChatResponse = {
    ban_round?: number;
    created?: number;
    eb_code?: number;
    error_code?: number;
    error_msg?: string;
    function_call?: FunctionCall;
    id?: string;
    is_end?: boolean;
    is_truncated?: boolean;
    need_clear_history?: boolean;
    object?: string;
    result?: string;
    sentence_id?: number;
    usage?: Usage;
  };

  type chatSingleStreamUsingGETParams = {
    /** msg */
    msg: string;
  };

  type chatSingleUsingPOST1Params = {
    /** msg */
    msg?: string;
  };

  type chatSingleUsingPOST2Params = {
    /** id */
    id?: number;
  };

  type ComparatorString_ = true;

  type DeleteRequest = {
    id?: string;
  };

  type FluxString_ = {
    prefetch?: number;
  };

  type FunctionCall = {
    arguments?: string;
    name?: string;
    thoughts?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGET1Params = {
    /** id */
    id?: string;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type ImageData = {
    b64_image?: string;
    index?: number;
    object?: string;
  };

  type ImageResponse = {
    created?: number;
    data?: ImageData[];
    error_code?: number;
    error_msg?: string;
    id?: string;
    object?: string;
    usage?: Usage;
  };

  type JSON = {
    config?: JSONConfig;
  };

  type JSONConfig = {
    checkDuplicate?: boolean;
    dateFormat?: string;
    ignoreCase?: boolean;
    ignoreError?: boolean;
    ignoreNullValue?: boolean;
    keyComparator?: ComparatorString_;
    order?: boolean;
    stripTrailingZeros?: boolean;
    transientSupport?: boolean;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: string;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MonoChatResponse_ = true;

  type MonoImageResponse_ = true;

  type MonoPromptResponse_ = true;

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChart_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Chart[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: User[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PluginUsage = {
    abstract_tokens?: number;
    name?: string;
    parse_tokens?: number;
    search_tokens?: number;
    total_tokens?: number;
  };

  type PromptErrMessage = {
    global?: string;
  };

  type PromptResponse = {
    code?: string;
    error_code?: number;
    error_msg?: string;
    log_id?: string;
    message?: PromptErrMessage;
    result?: PromptResult;
    status?: number;
    success?: boolean;
  };

  type PromptResult = {
    content?: string;
    templateContent?: string;
    templateId?: string;
    templateName?: string;
    templateVariables?: string;
  };

  type retryUsingGETParams = {
    /** chartId */
    chartId?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type Usage = {
    completion_tokens?: number;
    plugins?: PluginUsage[];
    prompt_tokens?: number;
    total_tokens?: number;
  };

  type User = {
    createTime?: string;
    id?: string;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: string;
    id?: string;
    mpOpenId?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
