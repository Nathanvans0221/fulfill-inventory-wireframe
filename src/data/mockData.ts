export interface InventoryItem {
  id: string;
  sku: string;
  itemName: string;
  location: string;
  locationPath: string[];
  onHand: number;
  available: number;
  allocated: number;
  reserves: number;
  onTransfer: number;
  grade: 1 | 2 | 3;
  status: 'Growing' | 'Ready';
  category: 'Live Goods' | 'Materials' | 'Availability';
  parentId?: string;
}

export interface AllocatedOrder {
  orderId: string;
  customer: string;
  qtyAllocated: number;
  shipDate: string;
}

export interface Reserve {
  reserveId: string;
  customer: string;
  qty: number;
  reserveDate: string;
  expiry: string;
}

export interface Transfer {
  toId: string;
  fromLocation: string;
  toLocation: string;
  qty: number;
  status: 'In Transit' | 'Pending' | 'Completed';
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Add' | 'Move' | 'Scrap' | 'Adjust';
  qty: number;
  user: string;
  notes: string;
}

export const inventoryItems: InventoryItem[] = [
  // Ageratum Blue 4" - Parent
  {
    id: 'AGE-001-P',
    sku: 'AGE-001',
    itemName: 'Ageratum Blue 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 490,
    available: 230,
    allocated: 130,
    reserves: 130,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
  },
  {
    id: 'AGE-001-1',
    sku: 'AGE-001',
    itemName: 'Ageratum Blue 4"',
    location: 'Main > GH-4 > West > C-2',
    locationPath: ['Main', 'GH-4', 'West', 'C-2'],
    onHand: 490,
    available: 230,
    allocated: 130,
    reserves: 130,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
    parentId: 'AGE-001-P',
  },
  // Alyssum White 4" - Parent
  {
    id: 'ALY-001-P',
    sku: 'ALY-001',
    itemName: 'Alyssum White 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 1215,
    available: 915,
    allocated: 150,
    reserves: 150,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
  },
  {
    id: 'ALY-001-1',
    sku: 'ALY-001',
    itemName: 'Alyssum White 4"',
    location: 'Main > GH-1 > North > A-1',
    locationPath: ['Main', 'GH-1', 'North', 'A-1'],
    onHand: 615,
    available: 465,
    allocated: 75,
    reserves: 75,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
    parentId: 'ALY-001-P',
  },
  {
    id: 'ALY-001-2',
    sku: 'ALY-001',
    itemName: 'Alyssum White 4"',
    location: 'Main > GH-2 > South > B-3',
    locationPath: ['Main', 'GH-2', 'South', 'B-3'],
    onHand: 600,
    available: 450,
    allocated: 75,
    reserves: 75,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
    parentId: 'ALY-001-P',
  },
  // Basil Sweet 4"
  {
    id: 'BAS-001-P',
    sku: 'BAS-001',
    itemName: 'Basil Sweet 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 595,
    available: 355,
    allocated: 120,
    reserves: 120,
    onTransfer: 75,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
  },
  {
    id: 'BAS-001-1',
    sku: 'BAS-001',
    itemName: 'Basil Sweet 4"',
    location: 'Main > GH-3 > East > D-1',
    locationPath: ['Main', 'GH-3', 'East', 'D-1'],
    onHand: 595,
    available: 355,
    allocated: 120,
    reserves: 120,
    onTransfer: 75,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
    parentId: 'BAS-001-P',
  },
  // Begonia Red 6"
  {
    id: 'BEG-001-P',
    sku: 'BEG-001',
    itemName: 'Begonia Red 6"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 210,
    available: 0,
    allocated: 210,
    reserves: 0,
    onTransfer: 0,
    grade: 2,
    status: 'Ready',
    category: 'Live Goods',
  },
  // Calibrachoa Mix 4.5"
  {
    id: 'CAL-001-P',
    sku: 'CAL-001',
    itemName: 'Calibrachoa Mix 4.5"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 840,
    available: 540,
    allocated: 200,
    reserves: 100,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
  },
  {
    id: 'CAL-001-1',
    sku: 'CAL-001',
    itemName: 'Calibrachoa Mix 4.5"',
    location: 'Main > GH-2 > North > A-4',
    locationPath: ['Main', 'GH-2', 'North', 'A-4'],
    onHand: 420,
    available: 270,
    allocated: 100,
    reserves: 50,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
    parentId: 'CAL-001-P',
  },
  {
    id: 'CAL-001-2',
    sku: 'CAL-001',
    itemName: 'Calibrachoa Mix 4.5"',
    location: 'Main > GH-3 > South > C-1',
    locationPath: ['Main', 'GH-3', 'South', 'C-1'],
    onHand: 420,
    available: 270,
    allocated: 100,
    reserves: 50,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
    parentId: 'CAL-001-P',
  },
  // Dianthus Pink 4"
  {
    id: 'DIA-001-P',
    sku: 'DIA-001',
    itemName: 'Dianthus Pink 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 320,
    available: 180,
    allocated: 80,
    reserves: 60,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
  },
  // Geranium Red 6"
  {
    id: 'GER-001-P',
    sku: 'GER-001',
    itemName: 'Geranium Red 6"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 450,
    available: 250,
    allocated: 150,
    reserves: 50,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
  },
  // Impatiens White 4"
  {
    id: 'IMP-001-P',
    sku: 'IMP-001',
    itemName: 'Impatiens White 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 680,
    available: 480,
    allocated: 100,
    reserves: 100,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
  },
  // Marigold Yellow 4"
  {
    id: 'MAR-001-P',
    sku: 'MAR-001',
    itemName: 'Marigold Yellow 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 920,
    available: 620,
    allocated: 200,
    reserves: 100,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
  },
  // Petunia Purple 4"
  {
    id: 'PET-001-P',
    sku: 'PET-001',
    itemName: 'Petunia Purple 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 550,
    available: 350,
    allocated: 120,
    reserves: 80,
    onTransfer: 0,
    grade: 2,
    status: 'Growing',
    category: 'Live Goods',
  },
  // Snapdragon Mix 4"
  {
    id: 'SNA-001-P',
    sku: 'SNA-001',
    itemName: 'Snapdragon Mix 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 380,
    available: 230,
    allocated: 100,
    reserves: 50,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Live Goods',
  },
  // Zinnia Orange 4"
  {
    id: 'ZIN-001-P',
    sku: 'ZIN-001',
    itemName: 'Zinnia Orange 4"',
    location: 'All Locations',
    locationPath: ['All'],
    onHand: 290,
    available: 190,
    allocated: 60,
    reserves: 40,
    onTransfer: 0,
    grade: 1,
    status: 'Growing',
    category: 'Live Goods',
  },
  // Materials
  {
    id: 'POT-4IN-P',
    sku: 'POT-4IN',
    itemName: '4" Plastic Pot',
    location: 'Warehouse',
    locationPath: ['Warehouse'],
    onHand: 5000,
    available: 4500,
    allocated: 500,
    reserves: 0,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Materials',
  },
  {
    id: 'POT-6IN-P',
    sku: 'POT-6IN',
    itemName: '6" Plastic Pot',
    location: 'Warehouse',
    locationPath: ['Warehouse'],
    onHand: 3000,
    available: 2700,
    allocated: 300,
    reserves: 0,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Materials',
  },
  {
    id: 'SOIL-001-P',
    sku: 'SOIL-001',
    itemName: 'Premium Potting Mix (cu.ft)',
    location: 'Warehouse',
    locationPath: ['Warehouse'],
    onHand: 800,
    available: 650,
    allocated: 150,
    reserves: 0,
    onTransfer: 0,
    grade: 1,
    status: 'Ready',
    category: 'Materials',
  },
];

export const allocatedOrders: Record<string, AllocatedOrder[]> = {
  'ALY-001-P': [
    { orderId: 'ORD-2024-001', customer: 'Garden Center Plus', qtyAllocated: 75, shipDate: '2026-01-05' },
    { orderId: 'ORD-2024-002', customer: 'Home Depot #1234', qtyAllocated: 75, shipDate: '2026-01-07' },
  ],
  'AGE-001-P': [
    { orderId: 'ORD-2024-003', customer: 'Lowes #5678', qtyAllocated: 130, shipDate: '2026-01-04' },
  ],
  'BAS-001-P': [
    { orderId: 'ORD-2024-004', customer: 'Local Nursery Co', qtyAllocated: 120, shipDate: '2026-01-06' },
  ],
};

export const reserves: Record<string, Reserve[]> = {
  'ALY-001-P': [
    { reserveId: 'RSV-001', customer: 'Walmart DC', qty: 150, reserveDate: '2025-12-20', expiry: '2026-01-15' },
  ],
  'CAL-001-P': [
    { reserveId: 'RSV-002', customer: 'Target Stores', qty: 100, reserveDate: '2025-12-22', expiry: '2026-01-20' },
  ],
};

export const transfers: Record<string, Transfer[]> = {
  'BAS-001-P': [
    { toId: 'TO-001', fromLocation: 'Main > GH-3', toLocation: 'Main > GH-1', qty: 75, status: 'In Transit' },
  ],
};

export const transactionHistory: Record<string, Transaction[]> = {
  'ALY-001-P': [
    { id: 'TXN-001', date: '2026-01-02 09:30', type: 'Add', qty: 200, user: 'John Doe', notes: 'Weekly production' },
    { id: 'TXN-002', date: '2026-01-01 14:15', type: 'Move', qty: -50, user: 'Jane Smith', notes: 'Moved to GH-2' },
    { id: 'TXN-003', date: '2025-12-30 11:00', type: 'Scrap', qty: -25, user: 'John Doe', notes: 'Disease damage' },
    { id: 'TXN-004', date: '2025-12-28 08:45', type: 'Adjust', qty: 15, user: 'Admin', notes: 'Count correction' },
  ],
  'AGE-001-P': [
    { id: 'TXN-005', date: '2026-01-02 10:00', type: 'Add', qty: 100, user: 'John Doe', notes: 'New batch' },
  ],
};

export const locations = {
  sites: ['Main', 'Warehouse'],
  houses: {
    'Main': ['GH-1', 'GH-2', 'GH-3', 'GH-4'],
    'Warehouse': ['WH-A', 'WH-B'],
  },
  bays: {
    'GH-1': ['North > A-1', 'North > A-2', 'South > B-1', 'South > B-2'],
    'GH-2': ['North > A-3', 'North > A-4', 'South > B-3', 'South > B-4'],
    'GH-3': ['East > C-1', 'East > D-1', 'West > C-2', 'West > D-2'],
    'GH-4': ['East > C-3', 'East > D-3', 'West > C-4', 'West > D-4'],
    'WH-A': ['Row 1', 'Row 2', 'Row 3'],
    'WH-B': ['Row 1', 'Row 2', 'Row 3'],
  },
};
