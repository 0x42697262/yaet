(function() {var type_impls = {
"pem_rfc7468":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Encoder%3C'o,+E%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#38\">source</a><a href=\"#impl-Encoder%3C'o,+E%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'o, E&gt; <a class=\"struct\" href=\"base64ct/encoder/struct.Encoder.html\" title=\"struct base64ct::encoder::Encoder\">Encoder</a>&lt;'o, E&gt;<div class=\"where\">where\n    E: <a class=\"trait\" href=\"base64ct/encoding/trait.Encoding.html\" title=\"trait base64ct::encoding::Encoding\">Encoding</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#42\">source</a><h4 class=\"code-header\">pub fn <a href=\"base64ct/encoder/struct.Encoder.html#tymethod.new\" class=\"fn\">new</a>(output: &amp;'o mut [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.u8.html\">u8</a>]) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"base64ct/encoder/struct.Encoder.html\" title=\"struct base64ct::encoder::Encoder\">Encoder</a>&lt;'o, E&gt;, <a class=\"enum\" href=\"base64ct/errors/enum.Error.html\" title=\"enum base64ct::errors::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Create a new encoder which writes output to the given byte slice.</p>\n<p>Output constructed using this method is not line-wrapped.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.new_wrapped\" class=\"method\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#64-68\">source</a><h4 class=\"code-header\">pub fn <a href=\"base64ct/encoder/struct.Encoder.html#tymethod.new_wrapped\" class=\"fn\">new_wrapped</a>(\n    output: &amp;'o mut [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.u8.html\">u8</a>],\n    width: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.usize.html\">usize</a>,\n    ending: <a class=\"enum\" href=\"pem_rfc7468/enum.LineEnding.html\" title=\"enum pem_rfc7468::LineEnding\">LineEnding</a>\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"base64ct/encoder/struct.Encoder.html\" title=\"struct base64ct::encoder::Encoder\">Encoder</a>&lt;'o, E&gt;, <a class=\"enum\" href=\"base64ct/errors/enum.Error.html\" title=\"enum base64ct::errors::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Create a new encoder which writes line-wrapped output to the given byte\nslice.</p>\n<p>Output will be wrapped at the specified interval, using the provided\nline ending. Use <a href=\"pem_rfc7468/enum.LineEnding.html#method.default\" title=\"associated function pem_rfc7468::LineEnding::default\"><code>LineEnding::default()</code></a> to use the conventional line\nending for the target OS.</p>\n<p>Minimum allowed line width is 4.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.encode\" class=\"method\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#79\">source</a><h4 class=\"code-header\">pub fn <a href=\"base64ct/encoder/struct.Encoder.html#tymethod.encode\" class=\"fn\">encode</a>(&amp;mut self, input: &amp;[<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.u8.html\">u8</a>]) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.unit.html\">()</a>, <a class=\"enum\" href=\"base64ct/errors/enum.Error.html\" title=\"enum base64ct::errors::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Encode the provided buffer as Base64, writing it to the output buffer.</p>\n<h5 id=\"returns\"><a class=\"doc-anchor\" href=\"#returns\">§</a>Returns</h5>\n<ul>\n<li><code>Ok(bytes)</code> if the expected amount of data was read</li>\n<li><code>Err(Error::InvalidLength)</code> if there is insufficient space in the output buffer</li>\n</ul>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.position\" class=\"method\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#114\">source</a><h4 class=\"code-header\">pub fn <a href=\"base64ct/encoder/struct.Encoder.html#tymethod.position\" class=\"fn\">position</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.usize.html\">usize</a></h4></section></summary><div class=\"docblock\"><p>Get the position inside of the output buffer where the write cursor\nis currently located.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.finish\" class=\"method\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#119\">source</a><h4 class=\"code-header\">pub fn <a href=\"base64ct/encoder/struct.Encoder.html#tymethod.finish\" class=\"fn\">finish</a>(self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&amp;'o <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.str.html\">str</a>, <a class=\"enum\" href=\"base64ct/errors/enum.Error.html\" title=\"enum base64ct::errors::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Finish encoding data, returning the resulting Base64 as a <code>str</code>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.finish_with_remaining\" class=\"method\"><a class=\"src rightside\" href=\"src/base64ct/encoder.rs.html#125\">source</a><h4 class=\"code-header\">pub fn <a href=\"base64ct/encoder/struct.Encoder.html#tymethod.finish_with_remaining\" class=\"fn\">finish_with_remaining</a>(self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;(&amp;'o <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.str.html\">str</a>, &amp;'o mut [<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/core/primitive.u8.html\">u8</a>]), <a class=\"enum\" href=\"base64ct/errors/enum.Error.html\" title=\"enum base64ct::errors::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Finish encoding data, returning the resulting Base64 as a <code>str</code>\nalong with the remaining space in the output buffer.</p>\n</div></details></div></details>",0,"pem_rfc7468::Base64Encoder"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()