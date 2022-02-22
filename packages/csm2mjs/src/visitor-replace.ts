import { Visitor } from "@swc/core/Visitor";
import { Expression, MemberExpression, parseSync } from "@swc/core";
import { isEqual } from "./utils";

const find = parse("process.env.NODE_ENV");
const replace = parse(JSON.stringify("development"));

function parse(str: string): Expression {
  const module = parseSync(str);

  if (
    module.body.length === 1 &&
    module.body[0].type === "ExpressionStatement"
  ) {
    return module.body[0].expression;
  }

  throw `cannot parse "${str}"`;
}

class ReplaceVisitor extends Visitor {
  visitMemberExpression(expression: MemberExpression): Expression {
    return isEqual(expression, find) ? replace : expression;
  }
}

export { ReplaceVisitor };