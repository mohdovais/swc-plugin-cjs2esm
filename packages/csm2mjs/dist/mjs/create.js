function createSpan({ start = 0, end = 0, ctxt = 0 } = {}) {
    return {
        start,
        end,
        ctxt,
    };
}
function createBooleanLiteral(value) {
    return {
        type: "BooleanLiteral",
        span: createSpan(),
        value,
    };
}
function createEmptyStatement() {
    return {
        type: "EmptyStatement",
        span: createSpan(),
    };
}
function createIdentifier(name) {
    return {
        type: "Identifier",
        span: createSpan(),
        value: name,
        optional: false,
    };
}
function createExpressionStatement(expression) {
    return {
        type: "ExpressionStatement",
        span: createSpan(),
        expression,
    };
}
function creatExportNamedDeclaration(names, source) {
    return {
        type: "ExportNamedDeclaration",
        span: createSpan(),
        specifiers: names.map((value) => ({
            type: "ExportSpecifier",
            span: createSpan(),
            orig: {
                type: "Identifier",
                span: createSpan(),
                value,
                optional: false,
            },
            exported: null,
        })),
        source,
        //@ts-ignore
        typeOnly: false,
    };
}
function createAssignmentExpressionStatement(name, value) {
    return createExpressionStatement({
        type: "AssignmentExpression",
        span: createSpan(),
        operator: "=",
        left: {
            type: "Identifier",
            span: createSpan(),
            value: name,
            optional: false,
            typeAnnotation: undefined,
        },
        right: value,
    });
}
function createExportAllDeclaration(url) {
    return {
        type: "ExportAllDeclaration",
        span: createSpan(),
        source: {
            type: "StringLiteral",
            span: createSpan(),
            value: url,
            hasEscape: false,
        },
    };
}
function createVariableDeclaration(name, expression, kind = "var") {
    return {
        type: "VariableDeclaration",
        span: createSpan(),
        kind,
        declare: false,
        declarations: [
            {
                type: "VariableDeclarator",
                span: createSpan(),
                id: {
                    type: "Identifier",
                    span: createSpan(),
                    value: name,
                    optional: false,
                    typeAnnotation: undefined,
                },
                init: expression,
                definite: false,
            },
        ],
    };
}
function createCallExpression(callee, args = []) {
    return {
        type: "CallExpression",
        span: createSpan(),
        callee: {
            type: "Identifier",
            span: createSpan(),
            value: callee,
            optional: false,
        },
        arguments: args,
    };
}
function createExportDefaultExpression(expression) {
    return {
        type: "ExportDefaultExpression",
        span: createSpan(),
        expression,
    };
}
function createStringLiteral(value) {
    return {
        type: "StringLiteral",
        span: createSpan(),
        value,
        hasEscape: false,
    };
}
// composite
function createStringLiteralStatement(literal) {
    return {
        type: "ExpressionStatement",
        span: createSpan(),
        expression: createStringLiteral(literal),
    };
}
function createExportDefaultObjectExpression(names) {
    return createExportDefaultExpression({
        type: "ObjectExpression",
        span: createSpan(),
        properties: names.map((value) => ({
            type: "Identifier",
            span: createSpan(),
            value,
            optional: false,
        })),
    });
}
function createImportDeclaration(specifier, url) {
    return {
        type: "ImportDeclaration",
        span: createSpan(),
        specifiers: Array.isArray(specifier)
            ? specifier.map((spec) => ({
                type: "ImportSpecifier",
                span: createSpan(),
                local: {
                    type: "Identifier",
                    span: createSpan(),
                    value: "",
                    optional: false,
                },
                imported: null,
            }))
            : specifier === ""
                ? []
                : [
                    {
                        type: "ImportDefaultSpecifier",
                        span: createSpan(),
                        local: {
                            type: "Identifier",
                            span: createSpan(),
                            value: specifier,
                            optional: false,
                        },
                    },
                ],
        source: {
            type: "StringLiteral",
            span: createSpan(),
            value: url,
            hasEscape: false,
        },
    };
}
function createExportDeclaration(name, expression) {
    return {
        type: "ExportDeclaration",
        span: createSpan(),
        declaration: {
            type: "VariableDeclaration",
            span: createSpan(),
            kind: "var",
            declare: false,
            declarations: [
                {
                    type: "VariableDeclarator",
                    span: createSpan(),
                    id: {
                        type: "Identifier",
                        span: createSpan(),
                        value: name,
                        optional: false,
                    },
                    init: expression,
                    definite: false,
                },
            ],
        },
    };
}
function createImporterFunction(fnName, ref) {
    return createVariableDeclaration(fnName, {
        type: "ArrowFunctionExpression",
        span: createSpan(),
        params: [],
        body: {
            type: "Identifier",
            span: createSpan(),
            value: ref,
            optional: false,
        },
        async: false,
        generator: false,
    });
}
/**
 *
 * @param {string} name
 * @returns {VariableDeclaration}
 */
function createVerifiedVariableDeclaration(name) {
    return createVariableDeclaration(name, {
        type: "ConditionalExpression",
        span: createSpan(),
        test: {
            type: "BinaryExpression",
            span: createSpan(),
            operator: "===",
            left: {
                type: "UnaryExpression",
                span: createSpan(),
                operator: "typeof",
                argument: {
                    type: "Identifier",
                    span: createSpan(),
                    value: name,
                    optional: false,
                },
            },
            right: {
                type: "StringLiteral",
                span: createSpan(),
                value: "object",
                hasEscape: false,
            },
        },
        consequent: {
            type: "Identifier",
            span: createSpan(),
            value: name,
            optional: false,
        },
        alternate: {
            type: "ObjectExpression",
            span: createSpan(),
            properties: [],
        },
    });
}
export { createBooleanLiteral, createEmptyStatement, createExpressionStatement, createSpan, createIdentifier, createStringLiteral, createVariableDeclaration, createAssignmentExpressionStatement, createCallExpression, createExportDefaultExpression, createExportDeclaration, createStringLiteralStatement, createExportAllDeclaration, createImportDeclaration, createImporterFunction, createVerifiedVariableDeclaration, createExportDefaultObjectExpression, creatExportNamedDeclaration, };
