# logtrace


```

var LogTrace = require('logtrace')

var logger = new LogTrace()

logger.info('caramel', 'chocolat')
// 2016-05-30 15:54:06.203 INFO [myNamespace] file.js:4 caramel chocolat

```

Environment variable:

`LOG_LEVEL` defaults to `INFO` with possible values in

- `DEBUG`
- `INFO`
- `WARN`
- 'ERROR`