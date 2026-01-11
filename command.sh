kubectl apply -f deployment.yaml >> deployment.log
timeout 15 kubectl get pods -w >> deployment.log
