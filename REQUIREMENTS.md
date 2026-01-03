# FULFILL Perpetual Inventory - Wireframe Requirements

**Product:** FULFILL
**Primary Color:** #BA3636 (red)
**ClickUp Task:** [DEV-7745](https://app.clickup.com/t/8599297/DEV-7745)
**Figma Reference:** Inventory page V2 (Make file)
**Date:** January 2, 2026

---

## Overview

A single-page inventory management view for greenhouse/production operations. Users can view inventory across all locations, perform transactions (add, move, scrap, adjust), see allocations/reserves, and track item history. The table supports grouping, filtering, and saveable layouts.

---

## Tech Stack

- React 18+ with TypeScript
- MUI v6 (@mui/material) - sx prop ONLY
- AG Grid Enterprise
- Grid2 for layouts

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ FULFILL (logo)                              [Weather] [User: John Doe]  │
├─────────────────────────────────────────────────────────────────────────┤
│ Inventory                                                               │
│                                                                         │
│ [Toolbar]                                                               │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Zoom+ Zoom- │ Auto Width │ Export Import │ Save │ Availability │    │ │
│ │             │ Freeze     │ Open          │      │ Inline Edits │    │ │
│ │                          │               │      │ Review Changes│   │ │
│ │                          │               │      │ Auto-Scrap    │   │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ [View Tabs: Live Goods | Materials | Availability]                      │
│ [Expand All] [Collapse All]  [Search by SKU...]  Status: 33 items, 67 loc│
│                                                                         │
│ ┌─────────────────────────────────────────────┬───────────────────────┐ │
│ │                                             │                       │ │
│ │              AG GRID TABLE                  │    SLIDER PANEL       │ │
│ │                                             │    (Right side)       │ │
│ │  - Groupable rows                           │                       │ │
│ │  - Expandable parent/child                  │    Opens on row       │ │
│ │  - Column sorting/filtering                 │    selection          │ │
│ │  - Saveable layouts                         │                       │ │
│ │                                             │                       │ │
│ └─────────────────────────────────────────────┴───────────────────────┘ │
│                                                                         │
│ Last updated: [timestamp]                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Components & Behaviors

### 1. Header
- [ ] FULFILL logo with #BA3636 accent
- [ ] Weather widget (top right)
- [ ] User avatar + name dropdown

### 2. Page Title
- [ ] "Inventory" as h1
- [ ] No breadcrumbs needed (single page)

### 3. Toolbar

| Button | Behavior |
|--------|----------|
| Zoom In | Increases table row height/font size |
| Zoom Out | Decreases table row height/font size |
| Auto Width | Auto-fits all columns to content |
| Freeze | Freezes selected column(s) to left |
| Export | Downloads current view as CSV/Excel |
| Import | Opens file picker for bulk import |
| Open | Opens selected item in new tab/modal |
| Save | Saves current layout (columns, grouping, filters) |
| Availability | Dropdown to toggle availability calculation display |
| Inline Edits | Toggle: enables inline cell editing (SKIP for wireframe) |
| Review Changes | Badge shows pending count; opens pending changes panel |
| Auto-Scrap | Runs auto-scrap rules (items >30 days unchanged status) |

**Toolbar Behaviors:**
- [ ] Bulk Actions dropdown appears when multiple rows selected
- [ ] Review Changes badge updates in real-time
- [ ] Auto-Scrap shows confirmation dialog with count before executing

### 4. View Tabs

| Tab | Description |
|-----|-------------|
| Live Goods | Growing/production inventory |
| Materials | Raw materials, supplies |
| Availability | Availability-focused view |

- [ ] Clicking tab filters table to that inventory type
- [ ] Active tab has underline/highlight in #BA3636
- [ ] Tab state persists in URL or localStorage

### 5. Table Controls Row
- [ ] **Expand All** button - expands all grouped rows
- [ ] **Collapse All** button - collapses all grouped rows
- [ ] **Search** input - filters by SKU/Item Name (debounced 300ms)
- [ ] **Status text** - "Current Inventory (X Items, Y Locations)"

### 6. AG Grid Table

**Columns:**
| Column | Type | Sortable | Filterable | Groupable |
|--------|------|----------|------------|-----------|
| SKU / Item Name | Text | Yes | Yes | Yes |
| Location | Text (hierarchical) | Yes | Yes | Yes |
| On Hand | Number | Yes | Yes | No |
| Available | Number (calculated) | Yes | Yes | No |
| Allocated | Number | Yes | Yes | No |
| Reserves | Number | Yes | Yes | No |
| On Transfer | Number | Yes | Yes | No |
| Grade | Enum (1,2,3) | Yes | Yes | Yes |
| Status | Enum (Growing, Ready) | Yes | Yes | Yes |

**Table Behaviors:**
- [ ] Row click selects row AND opens slider panel
- [ ] Click different row while slider open → slider updates to new row
- [ ] Multi-select with Ctrl+Click or checkbox column
- [ ] Grouped rows show aggregate totals
- [ ] Expand/collapse chevron on parent rows
- [ ] Child rows show full location path (Main > GH-4 > West > C-2)
- [ ] Column reorder via drag-and-drop
- [ ] Column resize via drag
- [ ] Column visibility menu (right-click header)
- [ ] Saved layouts persist grouping, column order, widths, visibility
- [ ] Status column shows colored badge (Growing=orange, Ready=green)
- [ ] Grade column shows numeric badge

### 7. Slider Panel (Right Side)

**Structure:**
```
┌─────────────────────────────────┐
│ [X Close]                       │
│                                 │
│ Item Name (Alyssum White 4")    │
│                                 │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐│
│ │Avail│ │Alloc│ │Rsrvd│ │OnHnd││
│ │1,215│ │ 515 │ │ 520 │ │ 150 ││
│ └─────┘ └─────┘ └─────┘ └─────┘│
│                                 │
│ View: [Transactions ▼]          │
│                                 │
│ ┌─────────────────────────────┐ │
│ │   View-specific content     │ │
│ │                             │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**Slider Behaviors:**
- [ ] Opens from right side with slide animation (300ms)
- [ ] X button closes slider
- [ ] Click outside slider closes it
- [ ] ESC key closes slider
- [ ] Shows item name as header
- [ ] Summary cards show: Available, Allocated, Reserved, On Hand
- [ ] View dropdown to switch content

**Slider Views:**

#### 7a. Transactions View (Default)
- [ ] "New Transaction" header
- [ ] Transaction Type dropdown: Create/Add, Move, Scrap, Adjust
- [ ] Quantity input (number)
- [ ] Location selectors: Site → House → Bay (cascading dropdowns)
- [ ] Grade dropdown: Grade 1, 2, 3
- [ ] Stage dropdown: Growing, Ready
- [ ] Notes textarea (optional)
- [ ] "Submit Transaction" button (#BA3636 primary)
- [ ] Submit validates required fields before posting
- [ ] Success shows toast notification
- [ ] Error shows inline validation messages

#### 7b. Allocated View
- [ ] List of orders this item is allocated to
- [ ] Each row shows: Order #, Customer, Qty Allocated, Ship Date
- [ ] "View Details" link opens order in new tab
- [ ] Empty state: "No allocations"

#### 7c. Reserves View
- [ ] List of reservations for this item
- [ ] Each row shows: Reserve ID, Customer, Qty, Reserve Date, Expiry
- [ ] "View Details" link
- [ ] Empty state: "No reservations"

#### 7d. On Transfer View
- [ ] List of active transfer orders involving this item
- [ ] Each row shows: TO #, From Location, To Location, Qty, Status
- [ ] "View Details" link
- [ ] Empty state: "No active transfers"

#### 7e. History View
- [ ] Chronological list of all transactions
- [ ] Each row shows: Date/Time, Type, Qty (+/-), User, Notes
- [ ] Pagination or infinite scroll for long history
- [ ] Filter by transaction type
- [ ] Empty state: "No transaction history"

### 8. Footer / Status Bar
- [ ] "Last updated: [timestamp]" - shows when data last refreshed
- [ ] Timestamp updates when data changes
- [ ] Format: "Last updated: Jan 2, 2026 3:45 PM"

---

## Data Flow

### Automatic Behaviors (No User Action)
1. **Mark as Ready**: Items automatically transition to "Ready" status based on availability + order shipped status
2. **Remove from Inventory**: Items on orders marked as "Shipped" are removed from inventory
3. **Availability Calculation**: Available = On Hand - Allocated - Reserved + On Transfer (incoming)
4. **Data Updates**: Table updates in real-time; timestamp refreshes on change

### Auto-Scrap Rules
- Items with unchanged status for >30 days flagged for auto-scrap
- Auto-Scrap button processes all flagged items
- Confirmation dialog shows count before execution

---

## State Management

| State | Persistence | Notes |
|-------|-------------|-------|
| Selected row | Session | Cleared on page refresh |
| Slider open/closed | Session | Closed by default |
| Slider view | Session | Defaults to Transactions |
| Active tab | URL/localStorage | Persists across sessions |
| Table layout | localStorage | Saved layouts persist |
| Column visibility | localStorage | Part of saved layout |
| Grouping | localStorage | Part of saved layout |
| Filters | Session | Cleared on refresh |
| Search query | Session | Cleared on refresh |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1200px) | Full table + slider side-by-side |
| Tablet (768-1200px) | Table full width, slider overlays |
| Mobile (<768px) | Not primary target, but table scrolls horizontally |

---

## Error States

- [ ] Network error: Toast with retry button
- [ ] Transaction failed: Inline error in slider form
- [ ] No data: Empty state with "No inventory items found"
- [ ] Loading: Skeleton loader for table, spinner for slider

---

## Phase 2 Checklist (For Ralph Loop)

### Setup
- [ ] Create React + TypeScript project
- [ ] Install MUI v6, AG Grid Enterprise
- [ ] Configure FULFILL theme (#BA3636 primary)
- [ ] Set up basic routing

### Layout
- [ ] Header with logo, weather placeholder, user dropdown
- [ ] Main content area with toolbar
- [ ] AG Grid table placeholder
- [ ] Slider panel component (hidden by default)

### Toolbar
- [ ] Zoom In/Out buttons (functional)
- [ ] Auto Width button
- [ ] Freeze button
- [ ] Export/Import buttons (mock)
- [ ] Save layout button
- [ ] Availability dropdown
- [ ] Review Changes with badge
- [ ] Auto-Scrap button

### View Tabs
- [ ] Three tabs: Live Goods, Materials, Availability
- [ ] Active state styling
- [ ] Tab click handler (filters table)

### Table Controls
- [ ] Expand All / Collapse All buttons
- [ ] Search input with debounce
- [ ] Status text (item/location count)

### AG Grid
- [ ] All columns configured
- [ ] Row grouping enabled
- [ ] Column sorting/filtering
- [ ] Row selection (single + multi)
- [ ] Row click opens slider
- [ ] Mock data (10-20 items with variations)

### Slider Panel
- [ ] Slide-in animation from right
- [ ] Close button (X)
- [ ] Item header + summary cards
- [ ] View dropdown
- [ ] Transactions form (all fields)
- [ ] Allocated view (mock data)
- [ ] Reserves view (mock data)
- [ ] On Transfer view (mock data)
- [ ] History view (mock data)
- [ ] Submit button (shows toast)

### Footer
- [ ] Last updated timestamp

### Polish
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Responsive behavior (tablet overlay)

---

## Acceptance Criteria

1. User can view all inventory items in a paginated/grouped AG Grid table
2. User can click a row to open the slider panel
3. User can create transactions via the slider form
4. User can switch slider views (Transactions, Allocated, Reserves, On Transfer, History)
5. User can save and restore table layouts
6. User can search, filter, sort, and group the table
7. Table shows calculated availability
8. Last updated timestamp displays and updates
9. All styling uses FULFILL red (#BA3636) as primary accent
10. No CSS files - all styling via MUI sx prop

---

## Out of Scope (For Later)

- Inline editing (toggle exists but disabled)
- Real API integration (using mock data)
- WebSocket real-time updates
- Mobile-optimized view
- Print view
- Bulk import functionality
- Advanced reporting

---

*Generated for wireframe build using Ralph Wiggum autonomous loop*
