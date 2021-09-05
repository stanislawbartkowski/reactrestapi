/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const TMess = t.union("string", "TStringParam", "null");

export const TMessParam = t.union("string", "number", "boolean");

export const TStringParam = t.iface([], {
  "localize": t.opt("boolean"),
  "messid": "string",
  "params": t.opt(t.array("TMessParam")),
});

export const IResourceListData = t.iface([], {
  "res": t.union(t.array("object"), "object"),
});

export const IDispatchBase = t.iface([], {
  "action": "string",
  "restid": t.opt("string"),
  "pars": t.opt("object"),
  "messid": t.opt("TMess"),
  "vars": t.opt("object"),
});

export const IFieldMessage = t.iface([], {
  "field": "string",
  "mess": "TMess",
});

export const IFormStateActions = t.iface([], {
  "focus": t.opt("string"),
  "error": t.opt(t.array("IFieldMessage")),
});

export const IDispatchFormRes = t.iface(["IDispatchBase"], {
  "confirm": t.opt("IDispatchFormRes"),
  "error": t.opt(t.array("IFieldMessage")),
  "close": t.opt("boolean"),
  "focus": t.opt("string"),
});

export const IDispatchListRes = t.iface(["IDispatchBase"], {
  "datares": t.opt("IResourceListData"),
});

export const ICallBackActionChoice = t.iface([], {
  "messid": "TMess",
  "jsaction": "string",
});

export const ActionType = t.enumtype({
  "JSACTION": 0,
  "CHOICE": 1,
  "RES": 2,
});

export const ICallBackActionDef = t.iface([], {
  "jsaction": t.opt(t.union("string", t.array("ICallBackActionChoice"), "IDispatchFormRes")),
  "isaction": t.opt("string"),
  "notempty": t.opt("boolean"),
});

export const IRowAction = t.iface(["ICallBackActionDef"], {
  "field": "string",
});

export const IClickButtonActionDef = t.iface(["ICallBackActionDef"], {
  "actionid": "string",
  "rowchosen": t.opt("boolean"),
  "close": t.opt("boolean"),
  "checkrequired": t.opt("boolean"),
});

const exportedTypeSuite: t.ITypeSuite = {
  TMess,
  TMessParam,
  TStringParam,
  IResourceListData,
  IDispatchBase,
  IFieldMessage,
  IFormStateActions,
  IDispatchFormRes,
  IDispatchListRes,
  ICallBackActionChoice,
  ActionType,
  ICallBackActionDef,
  IRowAction,
  IClickButtonActionDef,
};
export default exportedTypeSuite;
