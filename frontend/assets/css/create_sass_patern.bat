mkdir base utils layouts components pages themes vendors
type nul > "utils/_variables.scss"
type nul > "utils/_functions.scss"
type nul > "utils/_mixins.scss"
type nul > "base/_base.scss"
type nul > "base/_typography.scss"
type nul > "components/_buttons.scss"
type nul > "layouts/_header.scss"
type nul > "layouts/_container.scss"
type nul > "layouts/_footer.scss"
type nul > "layouts/_nav.scss"
type nul > "layouts/_form.scss"
(
echo @import "./utils/variables";
echo @import "./utils/functions";
echo @import "./utils/mixins";
echo @import "./base/base";
echo @import "./base/typography";
echo @import "./components/buttons";
echo @import "./layouts/header";
echo @import "./layouts/nav";
echo @import "./layouts/container";
echo @import "./layouts/form";
echo @import "./layouts/footer";
)>"style.scss"


