/**
 * Gets the document type of an Akoma Ntoso JSON object
 * @param {object} doc 
 */
export const anDocType = (doc) => {
   return Object.keys(doc.akomaNtoso)[0] ;
};

export const anDocTitle = (doc) => {
    return doc.akomaNtoso[anDocType(doc)].meta.publication.showAs;
};

export const anDocTypeRoot = (doc, type) => doc.akomaNtoso[type] ; 

export const anMeta = (doc, type) => anDocTypeRoot(doc, type).meta ;

export const anPublication = (doc, type) => anMeta(doc, type).publication ;

export const anFRBRExpression = (doc, type) => anMeta(doc, type).identification.FRBRExpression ;

export const anFRBRWork = (doc, type) => anMeta(doc, type).identification.FRBRWork ;

export const anFRBRcountry = (doc, type) => anFRBRWork(doc, type).FRBRcountry ;

export const anFRBRnumber = (doc, type) => anFRBRWork(doc, type).FRBRnumber ;

export const anFRBRlanguage = (doc, type) => anFRBRExpression(doc, type).FRBRlanguage || undefined  ;

export const anExprFRBRdate = (doc, type) => anFRBRExpression(doc, type).FRBRdate || undefined ;

export const anExprFRBRthis = (doc, type) => anFRBRExpression(doc, type).FRBRthis || undefined ;

export const anExprFRBRuri = (doc, type) => anFRBRExpression(doc, type).FRBRuri || undefined ;

export const anClassification = (doc, type) => anMeta(doc, type).classification ;

export const anKeywords = (doc, type) => anClassification(doc, type).keyword || undefined ;

export const anReferences = (doc, type) => anMeta(doc, type).references || undefined ;

export const anTLCConcept = (doc, type) => anReferences(doc, type).TLCConcept || undefined

export const anProprietary = (doc, type) => anMeta(doc, type).proprietary ;

export const anBody = (doc, type) => {
    let bodyProp = 
        (type === 'act') ? 
        'body': 
        ( (type === 'judgment') ? 'judgmentBody' : 'body' ) ;
    return anDocTypeRoot(doc, type)[bodyProp];
}

export const anBodyComponentRef = (body) =>  body.book.componentRef ;

