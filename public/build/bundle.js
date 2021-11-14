
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function slide(node, { delay = 0, duration = 400, easing = cubicOut } = {}) {
        const style = getComputedStyle(node);
        const opacity = +style.opacity;
        const height = parseFloat(style.height);
        const padding_top = parseFloat(style.paddingTop);
        const padding_bottom = parseFloat(style.paddingBottom);
        const margin_top = parseFloat(style.marginTop);
        const margin_bottom = parseFloat(style.marginBottom);
        const border_top_width = parseFloat(style.borderTopWidth);
        const border_bottom_width = parseFloat(style.borderBottomWidth);
        return {
            delay,
            duration,
            easing,
            css: t => 'overflow: hidden;' +
                `opacity: ${Math.min(t * 20, 1) * opacity};` +
                `height: ${t * height}px;` +
                `padding-top: ${t * padding_top}px;` +
                `padding-bottom: ${t * padding_bottom}px;` +
                `margin-top: ${t * margin_top}px;` +
                `margin-bottom: ${t * margin_bottom}px;` +
                `border-top-width: ${t * border_top_width}px;` +
                `border-bottom-width: ${t * border_bottom_width}px;`
        };
    }

    /* src/GenderCard.svelte generated by Svelte v3.44.1 */
    const file$5 = "src/GenderCard.svelte";

    // (18:8) {#if gender.mentalDisorder}
    function create_if_block_2$1(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "disorder svelte-c3sz5f");
    			attr_dev(i, "title", "This gender is a mental disorder");
    			add_location(i, file$5, 18, 12, 562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(18:8) {#if gender.mentalDisorder}",
    		ctx
    	});

    	return block;
    }

    // (22:4) {#if openDetails}
    function create_if_block$3(ctx) {
    	let div;
    	let p;
    	let t0_value = /*gender*/ ctx[0].description + "";
    	let t0;
    	let t1;
    	let div_transition;
    	let current;
    	let if_block = /*gender*/ ctx[0].mentalDisorder && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			add_location(p, file$5, 23, 12, 733);
    			attr_dev(div, "class", "details");
    			add_location(div, file$5, 22, 8, 682);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*gender*/ 1) && t0_value !== (t0_value = /*gender*/ ctx[0].description + "")) set_data_dev(t0, t0_value);

    			if (/*gender*/ ctx[0].mentalDisorder) {
    				if (if_block) ; else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, slide, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(22:4) {#if openDetails}",
    		ctx
    	});

    	return block;
    }

    // (25:12) {#if gender.mentalDisorder}
    function create_if_block_1$1(ctx) {
    	let p;
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			i = element("i");
    			t = text(" This gender is a mental disorder");
    			attr_dev(i, "class", "disorder svelte-c3sz5f");
    			attr_dev(i, "title", "This gender is a mental disorder");
    			add_location(i, file$5, 25, 41, 842);
    			attr_dev(p, "class", "disorder-note svelte-c3sz5f");
    			add_location(p, file$5, 25, 16, 817);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, i);
    			append_dev(p, t);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(25:12) {#if gender.mentalDisorder}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let article;
    	let h2;
    	let t0_value = /*gender*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let article_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*gender*/ ctx[0].mentalDisorder && create_if_block_2$1(ctx);
    	let if_block1 = /*openDetails*/ ctx[1] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			article = element("article");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(h2, "tabindex", "0");
    			attr_dev(h2, "role", "button");
    			attr_dev(h2, "aria-pressed", "false");
    			attr_dev(h2, "class", "svelte-c3sz5f");
    			add_location(h2, file$5, 15, 4, 372);
    			attr_dev(article, "class", article_class_value = "" + (null_to_empty('gender-card ' + (/*openDetails*/ ctx[1] ? 'opened' : '')) + " svelte-c3sz5f"));
    			attr_dev(article, "aria-expanded", /*openDetails*/ ctx[1]);
    			add_location(article, file$5, 14, 0, 271);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, h2);
    			append_dev(h2, t0);
    			append_dev(h2, t1);
    			if (if_block0) if_block0.m(h2, null);
    			append_dev(article, t2);
    			if (if_block1) if_block1.m(article, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(h2, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(h2, "keydown", /*handleKey*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*gender*/ 1) && t0_value !== (t0_value = /*gender*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

    			if (/*gender*/ ctx[0].mentalDisorder) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					if_block0.m(h2, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*openDetails*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*openDetails*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(article, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*openDetails*/ 2 && article_class_value !== (article_class_value = "" + (null_to_empty('gender-card ' + (/*openDetails*/ ctx[1] ? 'opened' : '')) + " svelte-c3sz5f"))) {
    				attr_dev(article, "class", article_class_value);
    			}

    			if (!current || dirty & /*openDetails*/ 2) {
    				attr_dev(article, "aria-expanded", /*openDetails*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GenderCard', slots, []);
    	let { gender } = $$props;

    	function handleKey(event) {
    		if (event.code == "Enter" || event.code == "Space") {
    			$$invalidate(1, openDetails = !openDetails);
    		}
    	}

    	let openDetails = false;
    	const writable_props = ['gender'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GenderCard> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(1, openDetails = !openDetails);

    	$$self.$$set = $$props => {
    		if ('gender' in $$props) $$invalidate(0, gender = $$props.gender);
    	};

    	$$self.$capture_state = () => ({ slide, gender, handleKey, openDetails });

    	$$self.$inject_state = $$props => {
    		if ('gender' in $$props) $$invalidate(0, gender = $$props.gender);
    		if ('openDetails' in $$props) $$invalidate(1, openDetails = $$props.openDetails);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [gender, openDetails, handleKey, click_handler];
    }

    class GenderCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { gender: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GenderCard",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*gender*/ ctx[0] === undefined && !('gender' in props)) {
    			console.warn("<GenderCard> was created without expected prop 'gender'");
    		}
    	}

    	get gender() {
    		throw new Error("<GenderCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gender(value) {
    		throw new Error("<GenderCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const filter = writable({
        hideDisorder: false
    });

    /* src/FilterDialog.svelte generated by Svelte v3.44.1 */
    const file$4 = "src/FilterDialog.svelte";

    function create_fragment$4(ctx) {
    	let div3;
    	let div1;
    	let div0;
    	let label;
    	let input;
    	let t0;
    	let t1;
    	let button;
    	let t3;
    	let div2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			label = element("label");
    			input = element("input");
    			t0 = text("\n                Hide Mental disorders");
    			t1 = space();
    			button = element("button");
    			button.textContent = "OK";
    			t3 = space();
    			div2 = element("div");
    			attr_dev(input, "id", "hideMental");
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "class", "svelte-17yyanl");
    			add_location(input, file$4, 14, 16, 288);
    			attr_dev(label, "for", "hideMental");
    			add_location(label, file$4, 13, 12, 247);
    			attr_dev(div0, "class", "filter svelte-17yyanl");
    			add_location(div0, file$4, 12, 8, 211);
    			add_location(button, file$4, 18, 8, 446);
    			attr_dev(div1, "class", "dialog-body svelte-17yyanl");
    			add_location(div1, file$4, 11, 4, 177);
    			attr_dev(div2, "class", "overlay on:click=" + /*toggleDialog*/ ctx[1] + " svelte-17yyanl");
    			add_location(div2, file$4, 20, 4, 505);
    			attr_dev(div3, "class", "dialog-container svelte-17yyanl");
    			add_location(div3, file$4, 10, 0, 142);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(label, input);
    			input.checked = /*$filter*/ ctx[0].hideDisorder;
    			append_dev(label, t0);
    			append_dev(div1, t1);
    			append_dev(div1, button);
    			append_dev(div3, t3);
    			append_dev(div3, div2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[3]),
    					listen_dev(button, "click", /*toggleDialog*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$filter*/ 1) {
    				input.checked = /*$filter*/ ctx[0].hideDisorder;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $filter;
    	validate_store(filter, 'filter');
    	component_subscribe($$self, filter, $$value => $$invalidate(0, $filter = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FilterDialog', slots, []);
    	let { opened } = $$props;

    	function toggleDialog() {
    		$$invalidate(2, opened = !opened);
    	}

    	const writable_props = ['opened'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FilterDialog> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		$filter.hideDisorder = this.checked;
    		filter.set($filter);
    	}

    	$$self.$$set = $$props => {
    		if ('opened' in $$props) $$invalidate(2, opened = $$props.opened);
    	};

    	$$self.$capture_state = () => ({ filter, opened, toggleDialog, $filter });

    	$$self.$inject_state = $$props => {
    		if ('opened' in $$props) $$invalidate(2, opened = $$props.opened);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$filter, toggleDialog, opened, input_change_handler];
    }

    class FilterDialog extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { opened: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FilterDialog",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*opened*/ ctx[2] === undefined && !('opened' in props)) {
    			console.warn("<FilterDialog> was created without expected prop 'opened'");
    		}
    	}

    	get opened() {
    		throw new Error("<FilterDialog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set opened(value) {
    		throw new Error("<FilterDialog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Filter.svelte generated by Svelte v3.44.1 */

    const { console: console_1$1 } = globals;
    const file$3 = "src/Filter.svelte";

    // (17:0) {#if opened}
    function create_if_block$2(ctx) {
    	let filterdialog;
    	let updating_opened;
    	let current;

    	function filterdialog_opened_binding(value) {
    		/*filterdialog_opened_binding*/ ctx[2](value);
    	}

    	let filterdialog_props = {};

    	if (/*opened*/ ctx[0] !== void 0) {
    		filterdialog_props.opened = /*opened*/ ctx[0];
    	}

    	filterdialog = new FilterDialog({
    			props: filterdialog_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(filterdialog, 'opened', filterdialog_opened_binding));

    	const block = {
    		c: function create() {
    			create_component(filterdialog.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(filterdialog, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const filterdialog_changes = {};

    			if (!updating_opened && dirty & /*opened*/ 1) {
    				updating_opened = true;
    				filterdialog_changes.opened = /*opened*/ ctx[0];
    				add_flush_callback(() => updating_opened = false);
    			}

    			filterdialog.$set(filterdialog_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(filterdialog.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(filterdialog.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(filterdialog, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(17:0) {#if opened}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let i;
    	let img;
    	let img_src_value;
    	let t;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*opened*/ ctx[0] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			i = element("i");
    			img = element("img");
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			if (!src_url_equal(img.src, img_src_value = "./filter.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "filter icon");
    			add_location(img, file$3, 12, 4, 250);
    			attr_dev(i, "class", "filter-icon svelte-d2idir");
    			attr_dev(i, "tabindex", "0");
    			add_location(i, file$3, 11, 0, 187);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			append_dev(i, img);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(i, "click", /*openDialog*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*opened*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*opened*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Filter', slots, []);
    	let opened = false;

    	function openDialog() {
    		$$invalidate(0, opened = !opened);
    		console.log(opened);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Filter> was created with unknown prop '${key}'`);
    	});

    	function filterdialog_opened_binding(value) {
    		opened = value;
    		$$invalidate(0, opened);
    	}

    	$$self.$capture_state = () => ({ FilterDialog, opened, openDialog });

    	$$self.$inject_state = $$props => {
    		if ('opened' in $$props) $$invalidate(0, opened = $$props.opened);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [opened, openDialog, filterdialog_opened_binding];
    }

    class Filter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Filter",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Footer.svelte generated by Svelte v3.44.1 */

    const file$2 = "src/Footer.svelte";

    function create_fragment$2(ctx) {
    	let footer;
    	let p0;
    	let t0;
    	let a0;
    	let t2;
    	let p1;
    	let t3;
    	let a1;
    	let t5;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			p0 = element("p");
    			t0 = text("Using ");
    			a0 = element("a");
    			a0.textContent = "Maxime Blanc API";
    			t2 = space();
    			p1 = element("p");
    			t3 = text("Made with ");
    			a1 = element("a");
    			a1.textContent = "Svelte";
    			t5 = text(" and a lot of pain");
    			attr_dev(a0, "href", "https://maximeblanc.fr/api/genders");
    			add_location(a0, file$2, 1, 13, 22);
    			add_location(p0, file$2, 1, 4, 13);
    			attr_dev(a1, "href", "https://svelte.dev");
    			add_location(a1, file$2, 2, 17, 109);
    			add_location(p1, file$2, 2, 4, 96);
    			attr_dev(footer, "class", "svelte-11f867u");
    			add_location(footer, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, p0);
    			append_dev(p0, t0);
    			append_dev(p0, a0);
    			append_dev(footer, t2);
    			append_dev(footer, p1);
    			append_dev(p1, t3);
    			append_dev(p1, a1);
    			append_dev(p1, t5);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/ContentLoader.svelte generated by Svelte v3.44.1 */

    const file$1 = "src/ContentLoader.svelte";

    // (11:9)      
    function fallback_block(ctx) {
    	let rect;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "width", /*width*/ ctx[8]);
    			attr_dev(rect, "height", /*height*/ ctx[7]);
    			attr_dev(rect, "x", "0");
    			attr_dev(rect, "y", "0");
    			attr_dev(rect, "rx", "5");
    			attr_dev(rect, "ry", "5");
    			add_location(rect, file$1, 11, 4, 338);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*width*/ 256) {
    				attr_dev(rect, "width", /*width*/ ctx[8]);
    			}

    			if (dirty & /*height*/ 128) {
    				attr_dev(rect, "height", /*height*/ ctx[7]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(11:9)      ",
    		ctx
    	});

    	return block;
    }

    // (17:4) {#if animate}
    function create_if_block_2(ctx) {
    	let animate_1;
    	let animate_1_dur_value;

    	const block = {
    		c: function create() {
    			animate_1 = svg_element("animate");
    			attr_dev(animate_1, "dur", animate_1_dur_value = "" + (/*speed*/ ctx[9] + "s"));
    			attr_dev(animate_1, "values", "-2; 1");
    			attr_dev(animate_1, "attributeName", "offset");
    			attr_dev(animate_1, "repeatCount", "indefinite");
    			add_location(animate_1, file$1, 17, 4, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, animate_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*speed*/ 512 && animate_1_dur_value !== (animate_1_dur_value = "" + (/*speed*/ ctx[9] + "s"))) {
    				attr_dev(animate_1, "dur", animate_1_dur_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(animate_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(17:4) {#if animate}",
    		ctx
    	});

    	return block;
    }

    // (27:4) {#if animate}
    function create_if_block_1(ctx) {
    	let animate_1;
    	let animate_1_dur_value;

    	const block = {
    		c: function create() {
    			animate_1 = svg_element("animate");
    			attr_dev(animate_1, "dur", animate_1_dur_value = "" + (/*speed*/ ctx[9] + "s"));
    			attr_dev(animate_1, "values", "-1.5; 1.5");
    			attr_dev(animate_1, "attributeName", "offset");
    			attr_dev(animate_1, "repeatCount", "indefinite");
    			add_location(animate_1, file$1, 27, 4, 789);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, animate_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*speed*/ 512 && animate_1_dur_value !== (animate_1_dur_value = "" + (/*speed*/ ctx[9] + "s"))) {
    				attr_dev(animate_1, "dur", animate_1_dur_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(animate_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(27:4) {#if animate}",
    		ctx
    	});

    	return block;
    }

    // (37:4) {#if animate}
    function create_if_block$1(ctx) {
    	let animate_1;
    	let animate_1_dur_value;

    	const block = {
    		c: function create() {
    			animate_1 = svg_element("animate");
    			attr_dev(animate_1, "dur", animate_1_dur_value = "" + (/*speed*/ ctx[9] + "s"));
    			attr_dev(animate_1, "values", "-1; 2");
    			attr_dev(animate_1, "attributeName", "offset");
    			attr_dev(animate_1, "repeatCount", "indefinite");
    			add_location(animate_1, file$1, 37, 4, 1030);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, animate_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*speed*/ 512 && animate_1_dur_value !== (animate_1_dur_value = "" + (/*speed*/ ctx[9] + "s"))) {
    				attr_dev(animate_1, "dur", animate_1_dur_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(animate_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(37:4) {#if animate}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let svg;
    	let title;
    	let t;
    	let rect;
    	let rect_clip_path_value;
    	let defs;
    	let clipPath;
    	let linearGradient;
    	let stop0;
    	let stop1;
    	let stop2;
    	let svg_viewBox_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);
    	let if_block0 = /*animate*/ ctx[5] && create_if_block_2(ctx);
    	let if_block1 = /*animate*/ ctx[5] && create_if_block_1(ctx);
    	let if_block2 = /*animate*/ ctx[5] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title = svg_element("title");
    			t = text("Loading...");
    			rect = svg_element("rect");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			if (if_block0) if_block0.c();
    			stop1 = svg_element("stop");
    			if (if_block1) if_block1.c();
    			stop2 = svg_element("stop");
    			if (if_block2) if_block2.c();
    			attr_dev(title, "id", "loading-aria");
    			add_location(title, file$1, 1, 1, 121);
    			set_style(rect, "fill", "url(" + /*baseUrl*/ ctx[6] + "#" + /*idGradient*/ ctx[10] + ")");
    			attr_dev(rect, "clip-path", rect_clip_path_value = "url(" + /*baseUrl*/ ctx[6] + "#" + /*idClip*/ ctx[11] + ")");
    			attr_dev(rect, "width", /*width*/ ctx[8]);
    			attr_dev(rect, "height", /*height*/ ctx[7]);
    			attr_dev(rect, "x", "0");
    			attr_dev(rect, "y", "0");
    			add_location(rect, file$1, 2, 1, 166);
    			attr_dev(clipPath, "id", /*idClip*/ ctx[11]);
    			add_location(clipPath, file$1, 9, 2, 301);
    			attr_dev(stop0, "stop-color", /*primaryColor*/ ctx[2]);
    			attr_dev(stop0, "stop-opacity", /*primaryOpacity*/ ctx[4]);
    			attr_dev(stop0, "offset", "0%");
    			add_location(stop0, file$1, 15, 3, 452);
    			attr_dev(stop1, "stop-color", /*secondaryColor*/ ctx[1]);
    			attr_dev(stop1, "stop-opacity", /*secondaryOpacity*/ ctx[3]);
    			attr_dev(stop1, "offset", "50%");
    			add_location(stop1, file$1, 25, 3, 687);
    			attr_dev(stop2, "stop-color", /*primaryColor*/ ctx[2]);
    			attr_dev(stop2, "stop-opacity", /*primaryOpacity*/ ctx[4]);
    			attr_dev(stop2, "offset", "100%");
    			add_location(stop2, file$1, 35, 3, 931);
    			attr_dev(linearGradient, "id", /*idGradient*/ ctx[10]);
    			add_location(linearGradient, file$1, 14, 2, 416);
    			add_location(defs, file$1, 8, 1, 292);
    			attr_dev(svg, "width", /*width*/ ctx[8]);
    			attr_dev(svg, "height", /*height*/ ctx[7]);
    			attr_dev(svg, "viewBox", svg_viewBox_value = "0 0 " + /*width*/ ctx[8] + " " + /*height*/ ctx[7]);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "ria-labelledby", "loading-aria");
    			attr_dev(svg, "preserveAspectRatio", /*preserveAspectRatio*/ ctx[0]);
    			add_location(svg, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title);
    			append_dev(title, t);
    			append_dev(svg, rect);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(clipPath, null);
    			}

    			append_dev(defs, linearGradient);
    			append_dev(linearGradient, stop0);
    			if (if_block0) if_block0.m(stop0, null);
    			append_dev(linearGradient, stop1);
    			if (if_block1) if_block1.m(stop1, null);
    			append_dev(linearGradient, stop2);
    			if (if_block2) if_block2.m(stop2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*baseUrl, idGradient*/ 1088) {
    				set_style(rect, "fill", "url(" + /*baseUrl*/ ctx[6] + "#" + /*idGradient*/ ctx[10] + ")");
    			}

    			if (!current || dirty & /*baseUrl, idClip*/ 2112 && rect_clip_path_value !== (rect_clip_path_value = "url(" + /*baseUrl*/ ctx[6] + "#" + /*idClip*/ ctx[11] + ")")) {
    				attr_dev(rect, "clip-path", rect_clip_path_value);
    			}

    			if (!current || dirty & /*width*/ 256) {
    				attr_dev(rect, "width", /*width*/ ctx[8]);
    			}

    			if (!current || dirty & /*height*/ 128) {
    				attr_dev(rect, "height", /*height*/ ctx[7]);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8192)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[13],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[13])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*width, height*/ 384)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			if (!current || dirty & /*idClip*/ 2048) {
    				attr_dev(clipPath, "id", /*idClip*/ ctx[11]);
    			}

    			if (/*animate*/ ctx[5]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(stop0, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (!current || dirty & /*primaryColor*/ 4) {
    				attr_dev(stop0, "stop-color", /*primaryColor*/ ctx[2]);
    			}

    			if (!current || dirty & /*primaryOpacity*/ 16) {
    				attr_dev(stop0, "stop-opacity", /*primaryOpacity*/ ctx[4]);
    			}

    			if (/*animate*/ ctx[5]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					if_block1.m(stop1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (!current || dirty & /*secondaryColor*/ 2) {
    				attr_dev(stop1, "stop-color", /*secondaryColor*/ ctx[1]);
    			}

    			if (!current || dirty & /*secondaryOpacity*/ 8) {
    				attr_dev(stop1, "stop-opacity", /*secondaryOpacity*/ ctx[3]);
    			}

    			if (/*animate*/ ctx[5]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$1(ctx);
    					if_block2.c();
    					if_block2.m(stop2, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (!current || dirty & /*primaryColor*/ 4) {
    				attr_dev(stop2, "stop-color", /*primaryColor*/ ctx[2]);
    			}

    			if (!current || dirty & /*primaryOpacity*/ 16) {
    				attr_dev(stop2, "stop-opacity", /*primaryOpacity*/ ctx[4]);
    			}

    			if (!current || dirty & /*idGradient*/ 1024) {
    				attr_dev(linearGradient, "id", /*idGradient*/ ctx[10]);
    			}

    			if (!current || dirty & /*width*/ 256) {
    				attr_dev(svg, "width", /*width*/ ctx[8]);
    			}

    			if (!current || dirty & /*height*/ 128) {
    				attr_dev(svg, "height", /*height*/ ctx[7]);
    			}

    			if (!current || dirty & /*width, height*/ 384 && svg_viewBox_value !== (svg_viewBox_value = "0 0 " + /*width*/ ctx[8] + " " + /*height*/ ctx[7])) {
    				attr_dev(svg, "viewBox", svg_viewBox_value);
    			}

    			if (!current || dirty & /*preserveAspectRatio*/ 1) {
    				attr_dev(svg, "preserveAspectRatio", /*preserveAspectRatio*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function uid() {
    	return Math.random().toString(36).substring(2);
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let idClip;
    	let idGradient;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContentLoader', slots, ['default']);
    	let { preserveAspectRatio = 'xMidYMid meet', secondaryColor = '#ecebeb', primaryColor = '#f9f9f9', secondaryOpacity = 1, primaryOpacity = 1, animate = true, baseUrl = '', height = 130, width = 400, speed = 2, uniqueKey } = $$props;

    	const writable_props = [
    		'preserveAspectRatio',
    		'secondaryColor',
    		'primaryColor',
    		'secondaryOpacity',
    		'primaryOpacity',
    		'animate',
    		'baseUrl',
    		'height',
    		'width',
    		'speed',
    		'uniqueKey'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContentLoader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('preserveAspectRatio' in $$props) $$invalidate(0, preserveAspectRatio = $$props.preserveAspectRatio);
    		if ('secondaryColor' in $$props) $$invalidate(1, secondaryColor = $$props.secondaryColor);
    		if ('primaryColor' in $$props) $$invalidate(2, primaryColor = $$props.primaryColor);
    		if ('secondaryOpacity' in $$props) $$invalidate(3, secondaryOpacity = $$props.secondaryOpacity);
    		if ('primaryOpacity' in $$props) $$invalidate(4, primaryOpacity = $$props.primaryOpacity);
    		if ('animate' in $$props) $$invalidate(5, animate = $$props.animate);
    		if ('baseUrl' in $$props) $$invalidate(6, baseUrl = $$props.baseUrl);
    		if ('height' in $$props) $$invalidate(7, height = $$props.height);
    		if ('width' in $$props) $$invalidate(8, width = $$props.width);
    		if ('speed' in $$props) $$invalidate(9, speed = $$props.speed);
    		if ('uniqueKey' in $$props) $$invalidate(12, uniqueKey = $$props.uniqueKey);
    		if ('$$scope' in $$props) $$invalidate(13, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		uid,
    		preserveAspectRatio,
    		secondaryColor,
    		primaryColor,
    		secondaryOpacity,
    		primaryOpacity,
    		animate,
    		baseUrl,
    		height,
    		width,
    		speed,
    		uniqueKey,
    		idGradient,
    		idClip
    	});

    	$$self.$inject_state = $$props => {
    		if ('preserveAspectRatio' in $$props) $$invalidate(0, preserveAspectRatio = $$props.preserveAspectRatio);
    		if ('secondaryColor' in $$props) $$invalidate(1, secondaryColor = $$props.secondaryColor);
    		if ('primaryColor' in $$props) $$invalidate(2, primaryColor = $$props.primaryColor);
    		if ('secondaryOpacity' in $$props) $$invalidate(3, secondaryOpacity = $$props.secondaryOpacity);
    		if ('primaryOpacity' in $$props) $$invalidate(4, primaryOpacity = $$props.primaryOpacity);
    		if ('animate' in $$props) $$invalidate(5, animate = $$props.animate);
    		if ('baseUrl' in $$props) $$invalidate(6, baseUrl = $$props.baseUrl);
    		if ('height' in $$props) $$invalidate(7, height = $$props.height);
    		if ('width' in $$props) $$invalidate(8, width = $$props.width);
    		if ('speed' in $$props) $$invalidate(9, speed = $$props.speed);
    		if ('uniqueKey' in $$props) $$invalidate(12, uniqueKey = $$props.uniqueKey);
    		if ('idGradient' in $$props) $$invalidate(10, idGradient = $$props.idGradient);
    		if ('idClip' in $$props) $$invalidate(11, idClip = $$props.idClip);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*uniqueKey*/ 4096) {
    			$$invalidate(11, idClip = uniqueKey ? `${uniqueKey}-idClip` : uid());
    		}

    		if ($$self.$$.dirty & /*uniqueKey*/ 4096) {
    			$$invalidate(10, idGradient = uniqueKey ? `${uniqueKey}-idGradient` : uid());
    		}
    	};

    	return [
    		preserveAspectRatio,
    		secondaryColor,
    		primaryColor,
    		secondaryOpacity,
    		primaryOpacity,
    		animate,
    		baseUrl,
    		height,
    		width,
    		speed,
    		idGradient,
    		idClip,
    		uniqueKey,
    		$$scope,
    		slots
    	];
    }

    class ContentLoader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			preserveAspectRatio: 0,
    			secondaryColor: 1,
    			primaryColor: 2,
    			secondaryOpacity: 3,
    			primaryOpacity: 4,
    			animate: 5,
    			baseUrl: 6,
    			height: 7,
    			width: 8,
    			speed: 9,
    			uniqueKey: 12
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContentLoader",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*uniqueKey*/ ctx[12] === undefined && !('uniqueKey' in props)) {
    			console.warn("<ContentLoader> was created without expected prop 'uniqueKey'");
    		}
    	}

    	get preserveAspectRatio() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set preserveAspectRatio(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get secondaryColor() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set secondaryColor(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primaryColor() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primaryColor(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get secondaryOpacity() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set secondaryOpacity(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get primaryOpacity() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set primaryOpacity(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get animate() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set animate(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get baseUrl() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set baseUrl(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get speed() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set speed(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get uniqueKey() {
    		throw new Error("<ContentLoader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set uniqueKey(value) {
    		throw new Error("<ContentLoader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.44.1 */

    const { Error: Error_1, console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i][0];
    	child_ctx[11] = list[i][1];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (117:1) {:catch error}
    function create_catch_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Very sadly, an error occured while retrieving the dis..genders :(";
    			attr_dev(p, "class", "notitication-message");
    			add_location(p, file, 117, 2, 2748);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(117:1) {:catch error}",
    		ctx
    	});

    	return block;
    }

    // (101:1) {:then _response}
    function create_then_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*filteredGenders*/ ctx[1] && /*filteredGenders*/ ctx[1].size > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(101:1) {:then _response}",
    		ctx
    	});

    	return block;
    }

    // (114:2) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "The list is empty";
    			attr_dev(p, "class", "notitication-message");
    			add_location(p, file, 114, 3, 2668);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(114:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (102:2) {#if filteredGenders && filteredGenders.size > 0}
    function create_if_block(ctx) {
    	let dl;
    	let current;
    	let each_value_1 = [.../*filteredGenders*/ ctx[1]];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			dl = element("dl");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(dl, "class", "svelte-lbqvqv");
    			add_location(dl, file, 102, 3, 2454);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dl, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(dl, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*filteredGenders*/ 2) {
    				each_value_1 = [.../*filteredGenders*/ ctx[1]];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(dl, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dl);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(102:2) {#if filteredGenders && filteredGenders.size > 0}",
    		ctx
    	});

    	return block;
    }

    // (106:5) {#each genderList as gender}
    function create_each_block_2(ctx) {
    	let dd;
    	let gendercard;
    	let t;
    	let current;

    	gendercard = new GenderCard({
    			props: { gender: /*gender*/ ctx[14] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			dd = element("dd");
    			create_component(gendercard.$$.fragment);
    			t = space();
    			attr_dev(dd, "class", "svelte-lbqvqv");
    			add_location(dd, file, 106, 6, 2572);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dd, anchor);
    			mount_component(gendercard, dd, null);
    			append_dev(dd, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gendercard_changes = {};
    			if (dirty & /*filteredGenders*/ 2) gendercard_changes.gender = /*gender*/ ctx[14];
    			gendercard.$set(gendercard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gendercard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gendercard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dd);
    			destroy_component(gendercard);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(106:5) {#each genderList as gender}",
    		ctx
    	});

    	return block;
    }

    // (104:4) {#each [...filteredGenders] as [key,genderList]}
    function create_each_block_1(ctx) {
    	let dt;
    	let t_value = /*key*/ ctx[10] + "";
    	let t;
    	let each_1_anchor;
    	let current;
    	let each_value_2 = /*genderList*/ ctx[11];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			dt = element("dt");
    			t = text(t_value);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(dt, "class", "svelte-lbqvqv");
    			add_location(dt, file, 104, 5, 2517);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dt, anchor);
    			append_dev(dt, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*filteredGenders*/ 2) && t_value !== (t_value = /*key*/ ctx[10] + "")) set_data_dev(t, t_value);

    			if (dirty & /*filteredGenders*/ 2) {
    				each_value_2 = /*genderList*/ ctx[11];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dt);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(104:4) {#each [...filteredGenders] as [key,genderList]}",
    		ctx
    	});

    	return block;
    }

    // (88:17)      <div class="content-placeholder">    {#each Array(4) as _}
    function create_pending_block(ctx) {
    	let div;
    	let current;
    	let each_value = Array(4);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "content-placeholder svelte-lbqvqv");
    			add_location(div, file, 88, 2, 1869);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(88:17)      <div class=\\\"content-placeholder\\\">    {#each Array(4) as _}",
    		ctx
    	});

    	return block;
    }

    // (91:4) <ContentLoader height={190} primaryColor={"#bf199699"} secondaryColor={"#bf1996"} speed="1">
    function create_default_slot(ctx) {
    	let rect0;
    	let t0;
    	let circle0;
    	let t1;
    	let rect1;
    	let t2;
    	let circle1;
    	let t3;
    	let rect2;
    	let t4;
    	let circle2;
    	let t5;

    	const block = {
    		c: function create() {
    			rect0 = svg_element("rect");
    			t0 = space();
    			circle0 = svg_element("circle");
    			t1 = space();
    			rect1 = svg_element("rect");
    			t2 = space();
    			circle1 = svg_element("circle");
    			t3 = space();
    			rect2 = svg_element("rect");
    			t4 = space();
    			circle2 = svg_element("circle");
    			t5 = space();
    			attr_dev(rect0, "x", "5");
    			attr_dev(rect0, "y", "15");
    			attr_dev(rect0, "rx", "5");
    			attr_dev(rect0, "ry", "5");
    			attr_dev(rect0, "width", "180");
    			attr_dev(rect0, "height", "15");
    			add_location(rect0, file, 91, 5, 2030);
    			attr_dev(circle0, "cx", "210");
    			attr_dev(circle0, "cy", "22");
    			attr_dev(circle0, "r", "8");
    			add_location(circle0, file, 92, 5, 2095);
    			attr_dev(rect1, "x", "5");
    			attr_dev(rect1, "y", "80");
    			attr_dev(rect1, "rx", "5");
    			attr_dev(rect1, "ry", "5");
    			attr_dev(rect1, "width", "140");
    			attr_dev(rect1, "height", "15");
    			add_location(rect1, file, 93, 5, 2134);
    			attr_dev(circle1, "cx", "170");
    			attr_dev(circle1, "cy", "88");
    			attr_dev(circle1, "r", "8");
    			add_location(circle1, file, 94, 5, 2199);
    			attr_dev(rect2, "x", "5");
    			attr_dev(rect2, "y", "145");
    			attr_dev(rect2, "rx", "5");
    			attr_dev(rect2, "ry", "5");
    			attr_dev(rect2, "width", "160");
    			attr_dev(rect2, "height", "15");
    			add_location(rect2, file, 95, 5, 2238);
    			attr_dev(circle2, "cx", "190");
    			attr_dev(circle2, "cy", "154");
    			attr_dev(circle2, "r", "8");
    			add_location(circle2, file, 96, 5, 2304);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect0, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, circle0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, rect1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, circle1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, rect2, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, circle2, anchor);
    			insert_dev(target, t5, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(circle0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(rect1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(circle1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(rect2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(circle2);
    			if (detaching) detach_dev(t5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(91:4) <ContentLoader height={190} primaryColor={\\\"#bf199699\\\"} secondaryColor={\\\"#bf1996\\\"} speed=\\\"1\\\">",
    		ctx
    	});

    	return block;
    }

    // (90:3) {#each Array(4) as _}
    function create_each_block(ctx) {
    	let contentloader;
    	let current;

    	contentloader = new ContentLoader({
    			props: {
    				height: 190,
    				primaryColor: "#bf199699",
    				secondaryColor: "#bf1996",
    				speed: "1",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contentloader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contentloader, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contentloader_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				contentloader_changes.$$scope = { dirty, ctx };
    			}

    			contentloader.$set(contentloader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contentloader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contentloader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contentloader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(90:3) {#each Array(4) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let nav;
    	let h1;
    	let t1;
    	let filter_1;
    	let t2;
    	let main;
    	let promise_1;
    	let t3;
    	let footer;
    	let current;
    	filter_1 = new Filter({ $$inline: true });

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 9,
    		error: 17,
    		blocks: [,,,]
    	};

    	handle_promise(promise_1 = /*promise*/ ctx[0], info);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			h1 = element("h1");
    			h1.textContent = "Gender List";
    			t1 = space();
    			create_component(filter_1.$$.fragment);
    			t2 = space();
    			main = element("main");
    			info.block.c();
    			t3 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(h1, "class", "svelte-lbqvqv");
    			add_location(h1, file, 82, 1, 1800);
    			attr_dev(nav, "class", "svelte-lbqvqv");
    			add_location(nav, file, 81, 0, 1793);
    			attr_dev(main, "class", "svelte-lbqvqv");
    			add_location(main, file, 86, 0, 1840);
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, h1);
    			append_dev(nav, t1);
    			mount_component(filter_1, nav, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, main, anchor);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = null;
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*promise*/ 1 && promise_1 !== (promise_1 = /*promise*/ ctx[0]) && handle_promise(promise_1, info)) ; else {
    				update_await_block_branch(info, ctx, dirty);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(filter_1.$$.fragment, local);
    			transition_in(info.block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(filter_1.$$.fragment, local);

    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(filter_1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function groupByName(list) {
    	const map = new Map();

    	list.forEach(item => {
    		const key = item.name[0].toUpperCase();
    		const collection = map.get(key);

    		if (!collection) {
    			map.set(key, [item]);
    		} else {
    			collection.push(item);
    		}
    	});

    	return map;
    }

    function filterGenders(byName, filter) {
    	if (!byName) {
    		return byName;
    	}

    	let filtered = new Map();

    	byName.forEach((list, letter) => {
    		let filteredList = list.filter(g => !(filter.hideDisorder && g.mentalDisorder));

    		if (filteredList.length) {
    			filtered.set(letter, filteredList);
    		}
    	});

    	return filtered;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const genderUrl = `https://maximeblanc.fr/api/genders`;
    	let gendersByName = null;
    	let promise = null;
    	let filteredGenders = null;

    	async function fetchGenders() {
    		console.log("Fetching genders...");

    		return fetch(genderUrl, {
    			method: 'GET',
    			headers: { Accept: 'application/json' }
    		}).then(response => {
    			if (!response.ok) {
    				throw new Error(response.error);
    			}

    			return response.json();
    		}).then(data => {
    			$$invalidate(2, gendersByName = groupByName(data));
    			return gendersByName;
    		}).catch(error => {
    			console.error(error);
    		});
    	}

    	// Store subscription
    	const filterUnsubscribe = filter.subscribe(f => {
    		$$invalidate(1, filteredGenders = filterGenders(gendersByName, f));
    	});

    	// Lifecycle
    	onMount(async () => {
    		$$invalidate(0, promise = fetchGenders());
    	});

    	onDestroy(filterUnsubscribe);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		GenderCard,
    		Filter,
    		Footer,
    		ContentLoader,
    		filter,
    		onDestroy,
    		onMount,
    		genderUrl,
    		gendersByName,
    		promise,
    		filteredGenders,
    		groupByName,
    		fetchGenders,
    		filterGenders,
    		filterUnsubscribe
    	});

    	$$self.$inject_state = $$props => {
    		if ('gendersByName' in $$props) $$invalidate(2, gendersByName = $$props.gendersByName);
    		if ('promise' in $$props) $$invalidate(0, promise = $$props.promise);
    		if ('filteredGenders' in $$props) $$invalidate(1, filteredGenders = $$props.filteredGenders);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*gendersByName*/ 4) {
    			// Watchers
    			$$invalidate(1, filteredGenders = filterGenders(gendersByName, filter));
    		}
    	};

    	return [promise, filteredGenders, gendersByName];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
