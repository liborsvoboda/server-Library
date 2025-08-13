<link rel="stylesheet" href="~/server-integrated/razor-pages/github/js/highlight/styles/foundation.css" />
<script src="~/server-integrated/razor-pages/github/js/highlight/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>


<script>
    $(document).ready(function () {
        $('pre').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    });
</script>