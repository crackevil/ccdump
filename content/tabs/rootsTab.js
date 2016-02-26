/* See license.txt for terms of usage */

define([
    "lib/domplate",
    "lib/lib",
    "lib/trace",
    "tabs/dynamicTab",
    "app/objectTableView",
],

function(Domplate, Lib, FBTrace, dynamicTab, ObjectTableView) {
with (Domplate) {

// ********************************************************************************************* //
// Home Tab

function RootsTab() {}
RootsTab.prototype = Lib.extend(dynamicTab.prototype,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Tab

    id: "Roots",
    label: "Roots",

    bodyTag:
        DIV({"class": "tabContent"}),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Content

    noAnalyses:
        SPAN("Run CC Collector to start analysis"),

    noRoots:
        SPAN("No roots found"),

    invalidate: function()
    {
        dynamicTab.prototype.invalidate.apply(this, arguments);
    },

    onUpdateBody: function(tabView, body)
    {
	var content = this.getTabContent();
        if (tabView.analyzer.isEmpty())
        {
            this.noAnalyses.replace({}, content);
            return;
        }

        var selection = tabView.selection;
        if (!selection)
        {
            this.noSelection.replace({}, content);
            return;
        }

        var analyzer = this.tabView.analyzer;
        var results = selection.address ? analyzer.findRoots(selection.address) : selection;
        if (results.length)
        {
            var table = new ObjectTableView();
            table.render(content, results);
        }
        else
        {
            this.noRoots.replace({}, content);
        }
    },
});

// ********************************************************************************************* //

return RootsTab;

// ********************************************************************************************* //
}});
