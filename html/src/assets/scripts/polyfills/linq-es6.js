const __extends = function(d, b) {
    for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    d[Symbol.iterator] = function() {
        return d();
    };
};

const fnTrue = function() {
    return true;
};
const fnSelf = function(x) {
    return x;
};

const generator = function*(array) {
    for (let i = 0; i < array.length; i++) {
        yield array[i];
    }
};

var Enumerable = function(array) {
    if (this && this.constructor == Enumerable) {
        throw "This is not a constructable type, don't use the `new` operator";
    }
    const instance = generator.bind(this, array);

    __extends(instance, generator);
    return instance;
};

const first = function(nullable, selector) {
    return function(fn) {
        fn = fn || selector;
        for (const item of this()) {
            if (fn(item)) {
                return item;
            }
        }

        if (nullable) {
            return undefined;
        }
        throw 'Sequence contains no matching elements';
    };
};

const single = function(nullable, selector) {
    return function(fn) {
        fn = fn || selector;
        let matched;
        for (const item of this()) {
            if (fn(item)) {
                if (matched) {
                    throw 'Sequence contains more than one matching element';
                } else {
                    matched = item;
                }
            }
        }

        if (matched) {
            return matched;
        }

        if (!matched && nullable) {
            return undefined;
        }

        throw 'Sequence contains no matching elements';
    };
};

const all = function(fn) {
    for (const x of this()) {
        if (!fn(x)) {
            return false;
        }
    }

    return true;
};

const any = function(fn) {
    fn = fn || fnTrue;

    for (const x of this()) {
        if (fn(x)) {
            return true;
        }
    }
    return false;
};

const count = function(fn) {
    fn = fn || fnTrue;

    let count = 0;
    for (const i of this()) {
        if (fn(i)) {
            count++;
        }
    }
    return count;
};

const aggregate = function(seed, fn, selector) {
    const it = this();

    switch (arguments.length) {
        case 1:
            fn = seed;
            seed = it.next().value;
            break;

        case 2:
            if (typeof seed === 'function') {
                selector = fn;
                fn = seed;
                seed = it.next().value;
            }
            break;
    }
    for (const item of it) {
        seed = fn(seed, item);
    }

    if (selector) {
        return selector(seed);
    }
    return seed;
};

const average = function(fn) {
    let total = 0;
    let count = 0;

    fn = fn || fnSelf;

    for (const item of this()) {
        total += fn(item);
        count++;
    }

    if (count) {
        return total / count;
    }
    throw Error('No items in the collection');
};

const concat = function(col) {
    return ConcatEnumerable(this, col);
};

const contains = function(value, tester) {
    const it = this();

    if (!tester) {
        for (const item of it) {
            if (item === value) {
                return true;
            }
        }
    } else {
        for (const item of it) {
            if (tester(item, value)) {
                return true;
            }
        }
    }
    return false;
};

const where = function(fn) {
    return WhereEnumerable(this, fn);
};

const select = function(fn) {
    return SelectEnumerable(this, fn);
};

const selectMany = function(fn) {
    return SelectManyEnumerable(this, fn);
};

const take = function(count) {
    return TakeEnumerable(this, count || 0);
};

const takeWhile = function(fn) {
    return TakeEnumerable(this, fn || 0);
};

const skip = function(count) {
    return SkipEnumerable(this, count || 0);
};

const skipWhile = function(fn) {
    return SkipEnumerable(this, fn || 0);
};

const toArray = function() {
    const arr = [];
    for (const i of this()) {
        arr.push(i);
    }
    return arr;
};

generator.where = where;
generator.filter = where;

generator.select = select;
generator.map = select;
generator.selectMany = selectMany;

generator.first = first(false, fnTrue);
generator.firstOrDefault = first(true, fnTrue);

generator.single = single(false, fnTrue);
generator.singleOrDefault = single(true, fnTrue);

generator.all = all;
generator.any = any;
generator.count = count;
generator.aggregate = aggregate;
generator.average = average;
generator.concat = concat;
generator.contains = contains;

generator.take = take;
generator.takeWhile = takeWhile;

generator.skip = skip;
generator.skipWhile = skipWhile;

generator.toArray = toArray;

var ConcatEnumerable = (function(__super) {
    return function(parent, col) {
        if (col.constructor === Array) {
            col = col.asEnumerable();
        }

        function* concat(col) {
            for (const item of parent()) {
                yield item;
            }

            for (const item of col()) {
                yield item;
            }
        }

        const x = concat.bind(this, col);
        __extends(x, __super);
        return x;
    };
})(generator);

var WhereEnumerable = (function(__super) {
    return function WhereEnumerable(parent, fn) {
        function* where(fn) {
            let index = 0;
            for (const x of parent()) {
                if (fn(x, index)) {
                    yield x;
                }
                index++;
            }
        }

        const x = where.bind(this, fn);
        __extends(x, __super);
        return x;
    };
})(generator);

var SelectEnumerable = (function(__super) {
    return function(parent, fn) {
        const selector = function*(parent, fn) {
            let index = 0;
            for (const item of parent()) {
                yield fn(item, index++);
            }
        };

        const instance = selector.bind(this, parent, fn);
        __extends(instance, __super);
        return instance;
    };
})(generator);

var SelectManyEnumerable = (function(__super) {
    return function(parent, colSelector, resultSelector) {
        const selectMany = function*(parent, colSelector, resultSelector) {
            resultSelector =
                resultSelector ||
                function(col, x) {
                    return x;
                };
            let index = 0;

            for (const item of parent()) {
                const arr = colSelector(item, index++);
                for (let i = 0; i < arr.length; i++) {
                    const foo = resultSelector(arr, arr[i]);
                    yield foo;
                }
            }
        };

        const instance = selectMany.bind(this, parent, colSelector, resultSelector);
        __extends(instance, __super);
        return instance;
    };
})(generator);

const RangeEnumerable = (function(__super) {
    return function(start, end) {
        const ranger = function*(start, end) {
            for (let i = 0; i < end; start++, i++) {
                yield start;
            }
        };

        const instance = ranger.bind(this, start, end);
        __extends(instance, __super);
        return instance;
    };
})(generator);

var TakeEnumerable = (function(__super) {
    return function(parent, selector) {
        const taker = function*(parent, selector) {
            let index = 0;
            if (typeof selector === 'number') {
                for (const item of parent()) {
                    if (index < selector) {
                        yield item;
                        index++;
                    } else {
                        break;
                    }
                }
            } else if (typeof selector === 'function') {
                for (const item of parent()) {
                    if (selector(item, index)) {
                        yield item;
                    } else {
                        break;
                    }
                    index++;
                }
            }
        };

        const instance = taker.bind(this, parent, selector);
        __extends(instance, __super);
        return instance;
    };
})(generator);

var SkipEnumerable = (function(__super) {
    return function(parent, selector) {
        const skippy = function*(parent, selector) {
            let index = 0;
            if (typeof selector === 'number') {
                for (const item of parent()) {
                    if (index >= selector) {
                        yield item;
                    }
                    index++;
                }
            } else if (typeof selector === 'function') {
                let flag = false;
                index = -1;
                for (const item of parent()) {
                    index++;
                    if (!flag && !selector(item, index)) {
                        flag = true;
                    }

                    if (flag) {
                        yield item;
                    }
                }
            }
        };

        const instance = skippy.bind(this, parent, selector);
        __extends(instance, __super);
        return instance;
    };
})(generator);

const RepeatEnumerable = (function(__super) {
    return function(item, count) {
        const repeater = function*(item, count) {
            const stripped = JSON.stringify(item);
            for (let i = 0; i < count; i++) {
                yield JSON.parse(stripped);
            }
        };

        const instance = repeater.bind(this, item, count);
        __extends(instance, __super);
        return instance;
    };
})(generator);

Enumerable.range = function(start, end) {
    start = start || 0;
    end = end || 0;

    return RangeEnumerable(start, end);
};

Enumerable.repeat = function(item, count) {
    return RepeatEnumerable(item, count || 0);
};

// extension methods
Array.prototype.asEnumerable = function() {
    return Enumerable(this);
};

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Enumerable;
} else if (typeof define === 'function' && define.amd) {
    define('linq', function() {
        return Enumerable;
    });
} else {
    global.Enumerable = Enumerable;
}
