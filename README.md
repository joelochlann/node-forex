# node-forex
Algorithmic trading in a browser

Hi,

<Intro>
I'd like to talk to you about Money. We all use it, it's occasionally not as available as we'd like, and a lot of people want more of it.

There's the saying, "Time is Money", and that's also what I'm presenting you with today - a method to hang onto that valuable time.

I'd like to tell you a story, I was visiting friends in Germany - middle of the black forest. Absolutely lovely area, but no phone signal. I knew that the Euro would drop, just knew it, but didn't know when. That's ok, alerts exist - I could tell myself when it dropped far enough. Middle of the black forest... no phone signal... that alert never came through. The first time I heard that the alert had fired was on the plane back. Wouldn't it have been useful, knowing that my trade would have fired, regardless of me needing to authorise it? It would have been a simple algorithm, "If price falls to this, then buy" - and really doesn't require human interaction.

With that story in mind I'd like to present our algorithmic trading platform, during a time, seemingly, of quite high volatility!

This project uses, a few existing algorithms to buy and sell currencies. Now, an algorithm, put simply, is a series of calculated steps strung together to solve a problem. So, using the latest technologies, and leveraging clients machines for the calculations, we can give them the power to create these algorithms, sending us the deal requests when the algorithms say, "now is the time to buy". No human interaction required.

<Technical Side>
100% pure unadulterated JavaScript!
- Everything handled by node.js: both static HTML/JS/CSS, and WebSockets which push price data to and receive trade data from the browser
- Socket.IO is a nice API on top of WebSockets
- Everything a breeze with npm
- Rough-and-ready clientside JS (jQuery, underscore, Handlebars, Highcharts, Bootstrap)
- For pseudo-classical inheritance, we used a 60-line implementation by John Resig
- Trader base class, subclasses implement particular algorithms (through buySignal/sellSignal methods)
- Scope for improvement:
-- Angular/React/something! (ran into problems updating templates)
-- Transpiler (Babel/Traceur) for ES6/TypeScript syntax
-- jspm for package management (rather than the usual ever-growing list of script tags)

<Finishing notes>
Now, algorithmic trading isn't anything new. There are a lot of companies that offer the technical information on their charts - however the ones that allow trading from those same charts is few and far between. An alert when a currency hits a certain exchange rate, "Google: EURGBP Set Alert" - 7 million results. Try doing the same thing for a Moving Average Alert, and suddenly your options are a little limited.

The question everyone should really be asking themselves is not, "Why should I use such a facility", but "Why am I not using one already?".

<Questions?>