#!/bin/bash

# Cruise Made Easy - Personas Deployment Script
# Version: 0.0.1

set -e  # Exit on any error

# Configuration
PLUGIN_NAME="cme-personas"
REMOTE_HOST="cme"
REMOTE_PATH="/var/convesio/wordpress/wp-content/plugins/${PLUGIN_NAME}"
LOCAL_PATH="./${PLUGIN_NAME}"
BACKUP_PATH="/tmp/${PLUGIN_NAME}-backup-$(date +%Y%m%d-%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Pre-deployment checks
log_info "Starting deployment of ${PLUGIN_NAME}..."

# Check if local plugin directory exists
if [ ! -d "$LOCAL_PATH" ]; then
    log_error "Local plugin directory '$LOCAL_PATH' does not exist!"
    exit 1
fi

# Check SSH connection
log_info "Testing SSH connection to ${REMOTE_HOST}..."
if ! ssh -q "$REMOTE_HOST" exit; then
    log_error "Cannot connect to ${REMOTE_HOST}!"
    exit 1
fi

# Create backup
log_info "Creating backup of existing plugin..."
ssh "$REMOTE_HOST" "if [ -d '${REMOTE_PATH}' ]; then cp -r '${REMOTE_PATH}' '${BACKUP_PATH}'; echo 'Backup created at ${BACKUP_PATH}'; else echo 'No existing plugin to backup'; fi"

# Deploy plugin
log_info "Deploying plugin to ${REMOTE_HOST}:${REMOTE_PATH}..."
rsync -avz --delete "$LOCAL_PATH/" "${REMOTE_HOST}:${REMOTE_PATH}/"

# Verify deployment
log_info "Verifying deployment..."
MAIN_FILE_EXISTS=$(ssh "$REMOTE_HOST" "[ -f '${REMOTE_PATH}/cme-personas.php' ] && echo 'yes' || echo 'no'")

if [ "$MAIN_FILE_EXISTS" = "yes" ]; then
    log_success "Plugin deployed successfully!"
    log_info "Backup location: ${REMOTE_HOST}:${BACKUP_PATH}"
else
    log_error "Deployment verification failed!"
    exit 1
fi

log_success "Deployment completed successfully!"