# clockify-overtime-calculator
A small userscript which calculates the overtime hours and minutes in clockify.<br>
**Important**: When pause times are tracked, you need to filter them out before the script is executed.

## Installation
Download the Add-on `Tampermonkey` for your browser.
The Add-on is available for all major Browsers (Firefox, Chrome, Safari, etc.)

Copy the content of the `clockify-overtime.js` file in this repository.<br>
Then click on the icon of Tampermonkey and click on `Create a new script`.<br>
Paste the content within the editor and save it by clicking `Ctrl + S` (`Cmd + S` Mac Users).<br>
The plugin should now be shown as enabled.

For further Information, see: https://www.tampermonkey.net/

### Firefox
In `about:config` set `security.csp.enable` to `false`, thus enabling tampermonkey to inject the script within clockify.

## Usage
Go under `Reports` and select yourself indside `Filters` -> `Team`.<br>
Then select the time period you want to calculate and click apply.<br>
>**Example**: If you want to see how many overtime hours and minutes you worked last year,
select `Last Year` as time period.<br>

Below the diagram there is a `Group By:` section.<br>
You need to group by `Date`.

Now you need to reload the page, because the script needs to find the right DOM Elements.
A blue button should appear next to the group by section titled `Calculate Overtime`.
By clicking on it the overtime will be calculated and displayed.
