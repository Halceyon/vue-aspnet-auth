[CmdletBinding()]
Param(
  [Parameter(Mandatory=$True,Position=1)]
   [string]$version
)

$pluginJson = Get-Content '.\package.json' -raw | ConvertFrom-Json

$pluginJson.version=$version

$pluginJson | ConvertTo-Json  | set-content '.\package.json'

npm publish

git checkout .\package.json