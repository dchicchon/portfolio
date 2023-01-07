import {
  R as React, r as reactExports, j as jsxs, a as jsx, F as Fragment, DataRouterContext,
  DataRouterStateContext,
  NavigationContext,
  LocationContext,
  RouteContext,
  RouteErrorContext,
} from "./index-753ea245.js";
/**
 * @remix-run/router v1.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
var Action;
(function (Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
var ResultType;
(function (ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(
      branches[i],
      // Incoming pathnames are generally encoded from either window.location
      // or from router.navigate, but we want to match against the unencoded
      // paths in the route definitions.  Memory router locations won't be
      // encoded here but there also shouldn't be anything to decode so this
      // should be a safe operation.  This avoids needing matchRoutes to be
      // history-aware.
      safelyDecodeURI(pathname)
    );
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$2({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
class ErrorResponse {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
function isRouteErrorResponse(e) {
  return e instanceof ErrorResponse;
}
/**
 * React Router v6.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function isPolyfill(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
}
const is = typeof Object.is === "function" ? Object.is : isPolyfill;
const {
  useState,
  useEffect,
  useLayoutEffect,
  useDebugValue
} = React;
function useSyncExternalStore$2(subscribe, getSnapshot, getServerSnapshot) {
  const value = getSnapshot();
  const [{
    inst
  }, forceUpdate] = useState({
    inst: {
      value,
      getSnapshot
    }
  });
  useLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot;
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({
        inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(() => {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({
        inst
      });
    }
    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({
          inst
        });
      }
    };
    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;
  try {
    const nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  return getSnapshot();
}
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const isServerEnvironment = !canUseDOM;
const shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
"useSyncExternalStore" in React ? ((module) => module.useSyncExternalStore)(React) : shim;
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useNavigate() {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  let activeRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
const OutletContext = /* @__PURE__ */ reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes, locationArg) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator
  } = reactExports.useContext(NavigationContext);
  let dataRouterStateContext = reactExports.useContext(DataRouterStateContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterStateContext || void 0);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$1({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorElement() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unhandled Thrown Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", {
    style: codeStyles
  }, "errorElement"), " props on ", /* @__PURE__ */ reactExports.createElement("code", {
    style: codeStyles
  }, "<Route>")));
}
class RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error,
        location: props.location
      };
    }
    return {
      error: props.error || state.error,
      location: state.location
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && match.route.errorElement) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = dataRouterState == null ? void 0 : dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null;
    let errorElement = dataRouterState ? match.route.errorElement || /* @__PURE__ */ reactExports.createElement(DefaultErrorElement, null) : null;
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
      match,
      routeContext: {
        outlet,
        matches: matches2
      }
    }, error ? errorElement : match.route.element !== void 0 ? match.route.element : outlet);
    return dataRouterState && (match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook$1;
(function (DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
})(DataRouterHook$1 || (DataRouterHook$1 = {}));
var DataRouterStateHook$1;
(function (DataRouterStateHook2) {
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
})(DataRouterStateHook$1 || (DataRouterStateHook$1 = {}));
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(false);
}
function Routes(_ref5) {
  let {
    children,
    location
  } = _ref5;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes, location);
}
var AwaitRenderStatus;
(function (AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let treePath = [...parentPath, index];
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      hasErrorBoundary: element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.7.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
    (!target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event);
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"];
const Link = /* @__PURE__ */ reactExports.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset
  } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends({}, rest, {
    href,
    onClick: reloadDocument ? onClick : handleClick,
    ref,
    target
  }))
  );
});
var DataRouterHook;
(function (DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook2["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook2) {
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
const polusIcon = "/assets/polus_icon-b437b845.png";
const polus = "_polus_1gr7c_1";
const hero = "_hero_1gr7c_8";
const hero_icon = "_hero_icon_1gr7c_16";
const large_text = "_large_text_1gr7c_22";
const link = "_link_1gr7c_1";
const link_tag = "_link_tag_1gr7c_1";
const video_section = "_video_section_1gr7c_42";
const polus_video_wrapper = "_polus_video_wrapper_1gr7c_1";
const polus_video = "_polus_video_1gr7c_1";
const last_updated = "_last_updated_1gr7c_66";
const fadeIn = "_fadeIn_1gr7c_1";
const styles$4 = {
  polus,
  hero,
  hero_icon,
  large_text,
  link,
  link_tag,
  video_section,
  polus_video_wrapper,
  polus_video,
  last_updated,
  fadeIn
};
const h1 = "_h1_1b3mv_3";
const h2 = "_h2_1b3mv_4";
const h3 = "_h3_1b3mv_5";
const color_dark = "_color_dark_1b3mv_21";
const color_light = "_color_light_1b3mv_24";
const appStyles = {
  h1,
  h2,
  h3,
  color_dark,
  color_light
};
function Home() {
  reactExports.useEffect(() => {
    document.title = "Polus";
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    id: styles$4.polus, children: [
    /* @__PURE__ */ jsxs("main", {
      className: styles$4.hero, children: [
      /* @__PURE__ */ jsx("img", { className: styles$4.hero_icon, src: polusIcon, alt: "Polus Icon" }),
      /* @__PURE__ */ jsx("h2", { className: appStyles.h2, children: "Polus" }),
      /* @__PURE__ */ jsx("p", { children: "A chrome extension to help plan your day" })
      ]
    }),
    /* @__PURE__ */ jsxs("main", {
      className: styles$4.video_section, children: [
      /* @__PURE__ */ jsx("div", { id: styles$4.polus_video_wrapper, children: /* @__PURE__ */ jsx("iframe", { id: styles$4.polus_video, title: "polus_video", src: "https://www.youtube.com/embed/25f_hLEdLds", allowFullScreen: true }) }),
      /* @__PURE__ */ jsx("section", {
        id: styles$4.link, children: /* @__PURE__ */ jsx(
          "a",
          {
            id: styles$4.link_tag,
            target: "_blank",
            rel: "noopener noreferrer",
            href: "https://chrome.google.com/webstore/detail/polus/meajimhgfmioppbkoppphhkbcmapfngh?hl=en&authuser=0",
            children: "+ Add Polus to Chrome"
          }
        )
      })
      ]
    })
    ]
  });
}
const classList = (...args) => args.join(" ");
const subheading = "_subheading_1q1zw_2";
const container = "_container_1q1zw_13";
const screenshot$1 = "_screenshot_1q1zw_23";
const card_width = "_card_width_1q1zw_38";
const styles$3 = {
  subheading,
  container,
  screenshot: screenshot$1,
  card_width
};
const screenshot = "/assets/screenshot-4431c665.png";
function About() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: styles$3.container, children: [
    /* @__PURE__ */ jsx("h1", { className: classList(appStyles.h1), children: "About" }),
    /* @__PURE__ */ jsx("p", { className: styles$3.subheading, children: "Polus is a personal planner designed to help you keep track of your time throughout the day, week, and month across multiple devices" }),
    /* @__PURE__ */ jsx("img", { className: styles$3.screenshot, src: screenshot, alt: "Polus screenshot" })
      ]
    })
  });
}
const table = "_table_gc9jm_2";
const styles$2 = {
  table
};
function Privacy() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("section", {
      className: "legal", children: [
    /* @__PURE__ */ jsx("h2", { className: "legal-h2", children: "Privacy Policy" }),
    /* @__PURE__ */ jsxs("p", {
        className: "legal-p", children: [
          "We at Polus are committed to protecting your privacy. This privacy policy applies to our browser extension (Polus), our website",
      /* @__PURE__ */ jsxs("a", {
            style: { color: "black" }, href: "https://www.danielchicchon.com/code/polus", children: [
              " ",
              " https://www.danielchicchon.com/projects/polus"
            ]
          }),
          ", any subdomains of danielchicchon.com."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        className: "legal-p", children: [
          "The information we gather or process is used solely for core functionality of Polus and to improve the quality and security of our service.",
      /* @__PURE__ */ jsx("strong", { children: "Your information isn’t and has never been sold to third parties." })
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "what-information-is-being-stored-or-accessed", children: "What information is being stored, or accessed?" }),
    /* @__PURE__ */ jsx("h5", { children: "Polus account information" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "Your name, email, account settings, and extension data (such as to-dos and links) are transferred and stored securely, solely for your usage within our extension and not shared with any other third parties, except as specified in this policy." }),
    /* @__PURE__ */ jsx("h5", { children: "Feature usage data" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "To improve the content, features and overall experience of the extension, we gather and log data on how our users access and use Polus Dashboard. For example, we may log actions like clicking on a photo source or completing/deleting a to-do (not the content of the to-do, just the action of completing/deleting it)." }),
    /* @__PURE__ */ jsx("h4", { id: "what-vendors-sub-processors-do-you-use", children: "What vendors/sub-processors do you use?" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "We use several vendors/sub-processors to conduct various aspects of our business." }),
    /* @__PURE__ */ jsxs("table", {
        className: styles$2.table, children: [
      /* @__PURE__ */ jsx("thead", {
          children: /* @__PURE__ */ jsxs("tr", {
            children: [
        /* @__PURE__ */ jsx("th", { children: "Vendor" }),
        /* @__PURE__ */ jsx("th", { children: "Purpose" })
            ]
          })
        }),
      /* @__PURE__ */ jsx("tbody", {
          children: /* @__PURE__ */ jsxs("tr", {
            children: [
        /* @__PURE__ */ jsx("td", { children: "Unsplash" }),
        /* @__PURE__ */ jsx("td", { children: "Some photos/backgrounds are retrieved from Unsplash. A request is made from your IP address to download photos." })
            ]
          })
        })
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "what-are-my-rights-in-relation-to-my-personal-data", children: "What are my rights in relation to my personal data?" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "By using Polus Dashboard, you may exercise the following rights:" }),
    /* @__PURE__ */ jsxs("ol", {
        children: [
      /* @__PURE__ */ jsxs("li", {
          children: [
        /* @__PURE__ */ jsx("strong", { children: " The right to refuse to provide your personal data" }),
        /* @__PURE__ */ jsx("br", {}),
            "The voluntary Personal Data you provide to us is an integral part of your use of Polus Dashboard. You can choose to forego the provision of that data, but you will be restricted from using our services."
          ]
        }),
      /* @__PURE__ */ jsxs("li", {
          children: [
        /* @__PURE__ */ jsx("strong", { children: "The right to access and modify your personal data" }),
        /* @__PURE__ */ jsx("br", {}),
            "Through your use of Polus Dashboard, you can access and amend your own data at any time. This includes adding, editing and deleting other Polus data like your to-dos."
          ]
        }),
      /* @__PURE__ */ jsxs("li", {
          children: [
        /* @__PURE__ */ jsx("strong", { children: " The right to be forgotten" }),
        /* @__PURE__ */ jsx("br", {}),
            "You can manually delete your account by clicking Delete my account on your Polus account’s Profile page at any time. See the “What happens to my data when I delete my account?” section below to learn more about the deletion process."
          ]
        }),
      /* @__PURE__ */ jsxs("li", {
          children: [
        /* @__PURE__ */ jsx("strong", { children: "The right to obtain your personal data " }),
        /* @__PURE__ */ jsx("br", {}),
            "Upon request, we will provide a data export of all your data stored in our system. If you wish to receive an export of your data, or have any problems deleting your account, please contact us."
          ]
        }),
      /* @__PURE__ */ jsxs("li", {
          children: [
        /* @__PURE__ */ jsx("strong", { children: " The right to submit a complaint " }),
        /* @__PURE__ */ jsx("br", {}),
            "If you have a complaint about the way in which your Personal Data is handled, please contact us. After submitting a complaint, we will reply within five (5) business days to confirm that we have received your complaint. After receiving your complaint, we will investigate it and provide you with our response within two (2) weeks."
          ]
        }),
      /* @__PURE__ */ jsxs("li", {
          children: [
        /* @__PURE__ */ jsx("strong", { children: "The right to submit a complaint with a data protection authority" }),
        /* @__PURE__ */ jsx("br", {}),
            "If you are a resident of the European Union, and you are not satisfied with the outcome of the complaint submitted to us, you have the right to lodge a complaint with your local data protection authority."
          ]
        })
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "what-happens-to-my-data-when-i-delete-my-account", children: "What happens to my data when I delete my account?" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "Upon account deletion, your account is flagged as deleted and your data is no longer accessible. This data is stored for a grace period (90 days) to allow for account recovery in the case of accidental or malicious deletion, or your desire to reopen your account. Upon request, you can expedite the process of performing a hard delete to remove all of your personal data from our databases. After a hard delete, your data will be deleted from our system, but could still be present in encrypted database backups for up to an additional 35 days." }),
    /* @__PURE__ */ jsxs("p", {
        className: "legal-p", children: [
          "To request an expedited hard delete, please",
          " ",
      /* @__PURE__ */ jsx("a", { href: "mailto:danielchicchon@gmail.com", children: " contact us." })
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "is-my-data-secure", children: " Is my data secure?" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "Data security is a priority at all times." }),
    /* @__PURE__ */ jsx("h4", { id: "will-the-privacy-policy-change", children: "Will the privacy policy change?" }),
    /* @__PURE__ */ jsx("p", { className: "legal-p", children: "Although most changes are likely to be minor, Polus may change its Privacy Policy from time to time, and at Polus' sole discretion. Polus encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change." }),
    /* @__PURE__ */ jsxs("p", {
        className: "legal-p", children: [
          "If you have any questions about Polus' Privacy policy, please",
      /* @__PURE__ */ jsx("a", { href: "mailto:danielchicchon@gmail.com", children: " contact us." })
        ]
      }),
    /* @__PURE__ */ jsx("p", { className: "last-updated", children: "Last updated September 14, 2020" })
      ]
    })
  });
}
const Terms$1 = "";
function Terms() {
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("section", {
      className: "legal", children: [
    /* @__PURE__ */ jsx("h2", { className: "legal-h2", children: "Terms of Use" }),
    /* @__PURE__ */ jsx("p", { className: "small", children: "Important: Before using this software (Polus), please carefully read this agreement which contains the terms and conditions under which you are acquiring a license to use Polus. If you do not accept the terms and conditions of this agreement please do not use Polus. If you access or use Polus, you will be accepting the terms and conditions of this agreement and Polus' Privacy Policy. Polus is protected by copyright laws and international copyright treaties, as well as other intellectual property laws." }),
    /* @__PURE__ */ jsx("p", { className: "small", children: "If you are an agent or employee of another entity you represent and warrant that (i) the individual accepting this agreement is duly authorized to accept this agreement on such entity’s behalf and to bind such entity, and (ii) such entity has full power, corporate or otherwise, to enter into this agreement and perform its obligations hereunder." }),
    /* @__PURE__ */ jsx("h4", { id: "1-definitions", children: "1. Definitions" }),
    /* @__PURE__ */ jsxs("p", {
        children: [
          '(i) "User" or "You" means the individual or the business entity to which a license is granted by Polus for the use of the Software;',
          " "
        ]
      }),
    /* @__PURE__ */ jsx("p", { children: `(ii) "Effective Date" means the date on which a User first installs the Licensed Software through Polus' website or through a third-party application, extension, or add-on store such as the Chrome Web Store` }),
    /* @__PURE__ */ jsx("p", { children: "(iii) “Licensed Software” means the web-based software extension called Polus, which is proprietary to Polus;" }),
    /* @__PURE__ */ jsx("p", { children: "(iv) “Licensee Data” means all electronic data or information submitted by User to the Service;" }),
    /* @__PURE__ */ jsx("p", { children: "(v) “Service” means the provision of access to the Licensed Software for the purpose of transmitting Licensee Data;" }),
    /* @__PURE__ */ jsx("p", { children: "(vi) “Usage Data” means data collected about the User’s use of the Service. For example, how often the User accesses a to do list, or what photo(s) they download." }),
    /* @__PURE__ */ jsx("h4", { id: "2-licenses-and-data", children: "2. Licenses and Data" }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: " 2. Licenses and Data 2.1 Software License Grant" }),
      /* @__PURE__ */ jsx("br", {}),
          "Subject to all of the terms and conditions of this Agreement and payment of any applicable fees, Polus grants to the User a royalty-free, non-exclusive, non-transferable license to download, install and use the Licensed Software as part of the Service."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: " 2.2 License to Licensee Data" }),
      /* @__PURE__ */ jsx("br", {}),
          "User grants to Polus a non-exclusive license to access and modify Licensee Data as required in order to provide the Service."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: " 2.3 Usage Data" }),
      /* @__PURE__ */ jsx("br", {}),
          "User agrees that Polus will have the right to collect Usage Data and to create statistics and analytics therefrom (“Derived Data”) as per the Privacy Policy currently in effect."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: " 2.4 Consent for Children Under 16" }),
      /* @__PURE__ */ jsx("br", {}),
          "By using our service, you represent and warrant that you are at least 16 years of age. No one under the age of 16 may use the Service, except as set forth as follows."
        ]
      }),
    /* @__PURE__ */ jsx("p", { children: "Polus is not directed to children, and we expect that any use by children will only be done with the guidance, supervision and consent of their parents, guardians and/or authorized school officials. If you are under the age of 16 you must receive consent from a parent, guardian and/or an authorized school official to use the Service. Polus relies on parents and guardians to ensure that minors only use Polus if they can understand their rights and responsibilities as laid out in these Terms of Service and in our Privacy Policy." }),
    /* @__PURE__ */ jsx("p", { children: `If you are an authorized school official in the United States or in the EU and want your students, who are under the age of 16, to create Polus accounts, you are responsible for complying with the U.S. Children's Online Privacy Protection Act ("COPPA") and, to the extent applicable, the Family Educational Rights and Privacy Act ("FERPA"), or the GDPR policy, respectively. This means that you must notify the students' parents/guardians of the personally identifiable information that Polus will collect, and that you will obtain parental/guardian consent before your students establish accounts or use Polus. When obtaining such consent, you must provide their parents or guardians with a copy of our Privacy Policy and keep all consents on file and provide them to us upon request.` }),
    /* @__PURE__ */ jsx("p", { children: "For more information on complying with COPPA, see the Federal Trade Commission's website. If you are located outside of the United States, we will rely on you to obtain any required consent or approval from the parent or guardian of any student covered by similar laws, and, as a condition to your and your students' use of Polus, you agree that you will be responsible for complying with such laws." }),
    /* @__PURE__ */ jsx("p", { children: "If we become aware that a child under the age of 16 has provided us with personal information, without the consent of a parent, guardian and/or an authorized school official, we will delete the child’s account and information. If you are aware that a child under the age of 16 has provided Polus with personal information without the consent of a parent, guardian and/or an authorized school official, please contact Polus support." }),
    /* @__PURE__ */ jsx("h4", { id: "3-disclaimer-of-warranties", children: " 3. Disclaimer of Warranties " }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "3.1" }),
          ' To the greatest extent permitted by law, the licensed software and technical support provided by Polus hereunder are provided on an "as is" basis. There are no warranties, representations or conditions, express or implied, written or oral, arising by statute, operation of law, course of dealing, usage of trade or otherwise, regarding them or any other product or service provided under this agreement or in connection with this agreement by Polus. Polus disclaims any implied warranties or conditions of quality, merchantability, merchantable quality, durability, fitness for a particular purpose and non-infringement. Polus does not represent or warrant that the software shall meet any or all of User’s particular requirements, that the software will operate error-free or uninterrupted or that all errors or defects in the software can be found or corrected.'
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "3.2" }),
          " In certain jurisdictions some or all of the provisions in this Section may not be effective, or the applicable law may mandate a more extensive warranty, in which case the applicable law will prevail over this Agreement."
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "4-limitation-of-liability", children: " 4. Limitation of Liability " }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "4.1" }),
          " To the greatest extent permitted by applicable law, in no event shall Polus be liable to the User or any other person for any direct, indirect, incidental, special, punitive, exemplary or consequential damages whatsoever, including without limitation, legal expenses, loss of business, loss of profits, loss of revenue, lost or damaged data, loss of computer time, cost of substitute goods or services, or failure to realize expected savings or any other commercial or economic losses arising out of or in connection with this agreement, even if Polus has been advised of the possibility of such loss or damages, or such losses or damages are foreseeable."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "4.2" }),
          " The entire liability of Polus and the User’s exclusive remedy with respect to the software and technical support. Any other products or services supplied by Polus in connection with this agreement for damages for any cause and regardless of the cause of action, whether in contract or in tort, including fundamental breach or negligence, will be limited in the aggregate to the amounts paid by User to Polus under this agreement for the software, technical support or services giving rise to the claim."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "4.3" }),
          " The disclaimer of representations, warranties and conditions and limitation of liability constitute an essential part of this agreement. You acknowledge that for the disclaimer of representations, warranties and conditions and limitation of liability, neither Polus nor any of its licensors or suppliers would grant the rights granted in this agreement."
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "5-proprietary-rights", children: "5. Proprietary Rights " }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "5.1" }),
          " The User acknowledges and agrees that the Licensed Software contains confidential and proprietary information and trade secrets belonging to Polus and its licensors. The User acknowledges and agrees that title in and rights to the Software remains exclusively with Polus and its licensors. The User’s rights to the Software are strictly limited to those granted in this Agreement. User shall not decompile, disassemble or otherwise reverse engineer the Software. If the foregoing provision is prohibited by applicable law, the User will provide Polus with advance written notification of (a) its intention to decompile, disassemble or otherwise reverse engineer the Software, and (b) the nature of the work involved. Polus will be given the right of first refusal to perform such work at its prevailing rates and prices."
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "6-uninstalling-the-software", children: " 6. Uninstalling the Software " }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "6.1" }),
          " Users can uninstall the Licensed Software at any time by following the process outlined in your browser’s help documentation."
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "7-term-and-termination", children: "7. Term and Termination " }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "7.1" }),
          " The term of this Agreement will begin upon the Effective Date and shall continue for as long as User uses the Service under subscription and pays all applicable fees, unless earlier terminated under this section 7."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "7.2" }),
          " Polus may terminate this Agreement in the event of any breach by the User if such breach has not been cured within thirty (30) days of notice to User. No termination of this Agreement will entitle the User to a refund of any amounts paid by User to Polus or affect any obligations User may have to pay any outstanding amounts owing to Polus."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "7.3" }),
          " The User’s rights to use and access the Service will immediately terminate upon termination or expiration of this Agreement. Sections 1, 4, 5, 6, 7, and 8.3 of this Agreement shall survive the expiration or termination of this Agreement."
        ]
      }),
    /* @__PURE__ */ jsx("h4", { id: "8-general-provisions", children: "8. General Provisions " }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "8.1 No Waiver" }),
      /* @__PURE__ */ jsx("br", {}),
          "No delay or failure in exercising any right under this Agreement, or any partial or single exercise of any right, will constitute a waiver of that right or any other rights under this Agreement. No consent to a breach of any express or implied term set out in this Agreement constitutes consent to any subsequent breach, whether of the same or any other provision."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "8.2 Severability" }),
      /* @__PURE__ */ jsx("br", {}),
          "If any provision of this Agreement is, or becomes, unenforceable, it will be severed from this Agreement and the remainder of this Agreement will remain in full force and effect."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "8.3 Assignment" }),
      /* @__PURE__ */ jsx("br", {}),
          "The User may not transfer or assign this Agreement (whether voluntarily, by operation of law, or otherwise) without Polus' prior written consent. Polus may assign this Agreement at any time without notice. This Agreement is binding upon and will inure to the benefit of both parties, and their respective successors and permitted assigns."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "8.4 Governing Law and Venue" }),
      /* @__PURE__ */ jsx("br", {}),
          "This Agreement shall be governed by the laws of the United States of America. No choice of laws rules of any jurisdiction shall apply to this Agreement. The User consents and agrees that the courts of the United States of America shall have jurisdiction over any legal action or proceeding brought by the User arising out of or relating to this Agreement, and the User consents to the jurisdiction of such courts for any such action or proceeding."
        ]
      }),
    /* @__PURE__ */ jsxs("p", {
        children: [
      /* @__PURE__ */ jsx("strong", { children: "8.5 Entire Agreement " }),
      /* @__PURE__ */ jsx("br", {}),
          "This Agreement is the entire understanding and agreement between the User and Polus with respect to the subject matter hereof, and it supersedes all prior negotiations, commitments and understandings, verbal or written, any purchase order issued by User."
        ]
      }),
    /* @__PURE__ */ jsx("p", { children: "If you have any questions about this agreement, please contact us." }),
    /* @__PURE__ */ jsx("p", { className: "last-updated", children: "Last updated September 14, 2020." })
      ]
    })
  });
}
const nav = "_nav_1fgal_1";
const nav_link = "_nav_link_1fgal_11";
const styles$1 = {
  nav,
  nav_link
};
function Navbar() {
  return /* @__PURE__ */ jsxs("header", {
    className: styles$1.nav, children: [
    /* @__PURE__ */ jsx(Link, { className: styles$1.nav_link, to: "", children: "Home" }),
    /* @__PURE__ */ jsx(Link, { className: styles$1.nav_link, to: "about", children: "About" }),
    /* @__PURE__ */ jsx(Link, { className: styles$1.nav_link, to: "privacy", children: "Privacy" }),
    /* @__PURE__ */ jsx(Link, { className: styles$1.nav_link, to: "terms", children: "Terms" })
    ]
  });
}
const polus_footer = "_polus_footer_10pn9_1";
const footer_nav = "_footer_nav_10pn9_13";
const footer_nav_col = "_footer_nav_col_10pn9_38";
const footer_logo = "_footer_logo_10pn9_43";
const footer_legal = "_footer_legal_10pn9_49";
const styles = {
  polus_footer,
  footer_nav,
  footer_nav_col,
  footer_logo,
  footer_legal
};
function Footer() {
  return /* @__PURE__ */ jsxs("footer", {
    id: styles.polus_footer, children: [
    /* @__PURE__ */ jsxs("nav", {
      className: styles.footer_nav, children: [
      /* @__PURE__ */ jsxs("div", {
        className: styles.footer_nav_col, children: [
        /* @__PURE__ */ jsx("h4", { children: "Company" }),
        /* @__PURE__ */ jsx(Link, { to: "about", children: "About" })
        ]
      }),
      /* @__PURE__ */ jsxs("div", {
        className: styles.footer_nav_col, children: [
        /* @__PURE__ */ jsx("h4", { children: "Support" }),
        /* @__PURE__ */ jsx(Link, { to: "privacy", children: "Privacy" }),
        /* @__PURE__ */ jsx(Link, { to: "terms", children: "Terms" })
        ]
      })
      ]
    }),
    /* @__PURE__ */ jsx("img", { className: styles.footer_logo, src: polusIcon, alt: "Polus Icon" })
    ]
  });
}
const Root = () => {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Footer, {})
    ]
  });
};
const App = () => {
  return /* @__PURE__ */ jsx(Routes, {
    children: /* @__PURE__ */ jsxs(Route, {
      path: "/", element: /* @__PURE__ */ jsx(Root, {}), children: [
    /* @__PURE__ */ jsx(Route, { path: "", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "about", element: /* @__PURE__ */ jsx(About, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "privacy", element: /* @__PURE__ */ jsx(Privacy, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "terms", element: /* @__PURE__ */ jsx(Terms, {}) })
      ]
    })
  });
};
export {
  App as default
};
//# sourceMappingURL=App-42830ba9.js.map
