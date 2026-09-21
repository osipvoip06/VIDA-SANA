export type NavigationScreen = 'inicio' | 'pos' | 'lotes' | 'clientes' | 'iabot' | 'sheets';

export type ViewDeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  lotNumber: string;
  expirationDate: string;
  daysToExpiration: number;
  stock: number;
  minStock: number;
  unit: string;
  image: string;
  isUrgent?: boolean;
  discountPercent?: number;
  location?: string;
  barcode: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
}

export type BatchStatus = 'caducado' | 'urgente' | 'atencion' | 'optimo';

export interface BatchItem {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  lotNumber: string;
  expirationDate: string;
  daysRemaining: number;
  status: BatchStatus;
  stock: number;
  minStock: number;
  cost: number;
  price: number;
  saleOfferPrice?: number;
  margin: number;
  provider: string;
  location: string;
  image: string;
  isDiscountActive?: boolean;
}

export interface ClientProfile {
  id: string;
  name: string;
  idCard: string;
  phone: string;
  email: string;
  clubLevel: 'Oro' | 'Platino' | 'Verde';
  levelNumber: number;
  points: number;
  pointsEquivalentRD: number;
  pointsToNextLevel: number;
  nextLevelProgress: number;
  birthday: string;
  lastPurchaseDate: string;
  lastPurchaseDaysAgo: number;
  lastPurchaseItems: string;
  avgRepositionDays: number;
  lifestyleTags: string[];
  recentPurchases: {
    ticketId: string;
    date: string;
    itemsCount: number;
    paymentType: 'Efectivo' | 'Tarjeta' | 'Transferencia';
    itemsSummary: string;
    total: number;
    pointsEarned: number;
  }[];
  therapistNotes: {
    note: string;
    specialist: string;
    updatedAt: string;
  };
  avatar: string;
}

export interface SheetsTransaction {
  rowId: number;
  ticketId: string;
  dateTime: string;
  clientId: string;
  clientTier?: string;
  paymentMethod: string;
  subtotal: number;
  itbis: number;
  total: number;
  cashier: string;
  cloudStatus: 'DRIVE SYNCED' | 'PENDING';
}

export interface SheetsSyncStats {
  connectedSheet: string;
  sheetId: string;
  totalRows: number;
  todayAddedRows: number;
  syncTimeAverageSeconds: number;
  apiCallsUsed: number;
  apiCallsLimit: number;
  latencyMs: number;
  lastSyncTime: string;
  offlineQueueCount: number;
  isSyncing: boolean;
}
