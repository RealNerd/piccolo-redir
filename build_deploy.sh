#/bin/bash
export AWS_REGION=us-east-1
sls create_domain --aws-profile digitalhamlet
sls deploy --aws-profile digitalhamlet

echo ""
tput setaf 2; echo "Build and deploy complete."; tput sgr0

if [[ `command -v notify-send` ]]; then
  notify-send "Piccolo redirector services deployed"
else
  terminal-notifier -message "Piccolo redirector services deployed" -title "SLS Deploy"
fi