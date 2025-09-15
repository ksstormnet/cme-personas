# CLAUDE.md - Personas Plugin Repository

**IMMUTABLE AI CONTEXT**: This file provides context for the CME Personas WordPress plugin repository within the Cruise Made Easy ecosystem.

## 🚨 CRITICAL: ISOLATED CONTEXT ENFORCEMENT 🚨

**IMPERATIVE AND IMMUTABLE RULE**: When working in this repository (`/repo/Cruise-Made-Easy/cme-personas/`), Claude MUST:

1. **LOAD THIS FILE** as the PRIMARY context source
2. **REFERENCE** the master project context at `/repo/Cruise-Made-Easy/CLAUDE.md` for architectural awareness ONLY
3. **MAINTAIN ISOLATION** within this repository's scope and concerns
4. **USE REPOSITORY-SPECIFIC** `.claude/agents/` and `.claude/commands/` resources
5. **FOCUS EXCLUSIVELY** on customer personas WordPress plugin development

**Context Sources (IN ORDER OF PRIORITY)**:
1. This CLAUDE.md file (PRIMARY)
2. Master project CLAUDE.md (architectural reference only)
3. Repository-specific `.claude/` resources
4. Local project files in this repository ONLY
5. MCP servers configured in `.claude/settings.local.json`

**FORBIDDEN CONTEXT**:
- Global `/home/scott/.claude/CLAUDE.md` (superseded by master project)
- Other repository contexts (unless explicitly coordinating)
- Global agent library (use repository-specific symlinks only)

## Repository Purpose

**CME Personas Plugin** - WordPress plugin for managing customer personas, demographic targeting, and personalized cruise recommendations within the Cruise Made Easy platform.

**Plugin Package**: Installable ZIP for conventional WordPress plugin installation

## Architecture Focus

### Plugin Responsibilities
- **Customer Personas**: Define and manage cruise customer archetypes
- **Demographic Analysis**: Age, income, travel preferences, lifestyle targeting
- **Personalized Recommendations**: Match cruises to customer personas
- **Marketing Automation**: Persona-based content and offer targeting

### WordPress Integration
- **Custom Post Types**: Persona definitions and demographic data
- **Taxonomy System**: Persona categories, interests, and preferences
- **User Meta Integration**: Visitor persona matching and tracking
- **Content Targeting**: Display personalized content based on detected personas

### Deployment Structure
**CRITICAL**: This plugin must be restructured to match the cme-cruise-engine pattern:
- **Current**: Flat structure with plugin files in root
- **Required**: Nested structure `cme-personas/cme-personas/` for consistent deployment
- **Reason**: Enables identical deployment scripts and package management across plugins

## Development Workflow

### Repository Isolation
This repository MUST remain focused on:
- ✅ WordPress plugin development for customer persona management
- ✅ Demographic analysis and targeting systems
- ✅ Personalized cruise recommendation algorithms
- ✅ Plugin packaging and distribution preparation
- ❌ Cruise engine functionality (handled in cme-cruise-engine repo)
- ❌ Docker orchestration (handled in cme-docker-website repo)
- ❌ Custom code management (handled in cme-custom-code repo)

### Plugin Architecture
- **Persona Engine**: Core logic for persona definition and matching
- **Recommendation System**: Algorithm for cruise-persona matching
- **Admin Interface**: Persona management and analytics dashboard
- **Frontend Integration**: Visitor persona detection and targeting

### Testing and Validation
- **WordPress Standards**: PHP CodeSniffer with WordPress ruleset
- **Persona Logic Tests**: Recommendation algorithm accuracy validation
- **Performance Tests**: Persona matching optimization and caching
- **Package Testing**: Installation and activation verification

## Restructuring Requirements

### Current Structure Issues
```
cme-personas/
├── assets/
├── personas-plugin.php
├── includes/
└── admin/
```

### Required Structure (Match cme-cruise-engine)
```
cme-personas/
├── deploy.sh                  # Deployment script
├── package.json              # npm dependencies  
├── cme-personas/             # Plugin files (nested)
│   ├── assets/
│   ├── personas-plugin.php
│   ├── includes/
│   └── admin/
├── tests/                    # Testing framework
└── docs/                    # Documentation
```

### Deployment Consistency
- **Deploy Script**: `deploy.sh` matching cruise engine pattern
- **Package Management**: npm/composer integration for dependencies
- **Testing Infrastructure**: PHPUnit and coding standards validation
- **Version Management**: Semantic versioning and automated releases

## Plugin Functionality

### Core Features
- **Persona Definitions**: Create and manage customer archetypes
- **Demographic Targeting**: Age groups, income levels, travel patterns
- **Interest Mapping**: Match personas to cruise types and destinations
- **Behavioral Tracking**: Visitor interaction patterns and preferences
- **Recommendation Engine**: Personalized cruise suggestions

### Admin Interface
- **Persona Builder**: Visual persona creation and editing tools
- **Analytics Dashboard**: Persona performance and conversion tracking
- **Targeting Rules**: Define persona matching criteria and algorithms
- **A/B Testing**: Test different persona targeting strategies

### Frontend Features
- **Persona Detection**: Automatic visitor persona identification
- **Content Personalization**: Dynamic content based on detected persona
- **Recommendation Widgets**: Personalized cruise suggestions
- **Conversion Tracking**: Monitor persona-based engagement metrics

## Technical Integration

### Database Integration
- **Custom Tables**: Persona definitions, visitor tracking, recommendation logs
- **WordPress Integration**: Custom post types, meta fields, taxonomy system
- **Cache Integration**: Redis caching for persona matching and recommendations
- **Analytics Storage**: Persona performance and conversion data

### Algorithm Architecture
- **Scoring System**: Weighted persona matching based on multiple factors
- **Machine Learning**: Improve recommendations based on user behavior
- **Real-time Processing**: Dynamic persona detection and content adaptation
- **Fallback Logic**: Default recommendations when persona unclear

### Performance Optimization
- **Caching Strategy**: Redis cache for persona data and recommendations
- **Query Optimization**: Efficient database queries for persona matching
- **Lazy Loading**: On-demand persona calculation and content loading
- **CDN Integration**: Cache personalized content at edge locations

## MCP Integration

### Available MCP Servers
Configured in `.claude/settings.local.json`:
- **Filesystem MCP**: Repository file operations and plugin packaging
- **WordPress MCP**: WordPress development and testing utilities
- **Analytics MCP**: Persona performance tracking and optimization

### Repository-Specific Agents
Available in `.claude/agents/`:
- **PHP Developers**: For WordPress plugin development
- **Data Scientists**: For persona algorithm development and optimization
- **UX Specialists**: For persona-based interface design
- **Marketing Analysts**: For demographic targeting and conversion optimization

## Technical Stack

### Core Technologies
- **WordPress**: Plugin framework and hook system
- **PHP**: Server-side persona logic and recommendation algorithms
- **JavaScript**: Frontend persona detection and dynamic content
- **MySQL**: Persona data storage and analytics tracking

### Development Tools
- **PHP CodeSniffer**: WordPress coding standards compliance
- **Package Scripts**: Automated building and packaging
- **Version Management**: Semantic versioning and release automation
- **Testing Framework**: PHPUnit for persona algorithm validation

### Plugin Standards
- **WordPress Hooks**: Proper action and filter usage
- **Database Integration**: Custom tables and WordPress meta system
- **Internationalization**: Translation-ready text strings
- **Accessibility**: WCAG compliant admin interfaces

---

**CONTEXT REMINDER**: This repository focuses exclusively on customer personas WordPress plugin development. The plugin structure must be restructured to match the cme-cruise-engine pattern for deployment consistency.

**Current Status**: Plugin functional but requires restructuring to nested format and deployment script integration for consistency with other CME plugins.

**Priority**: Restructure to nested format with deploy.sh script and testing infrastructure to match cruise engine architecture.