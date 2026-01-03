import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Chip,
  List,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import {
  type InventoryItem,
  allocatedOrders,
  reserves,
  transfers,
  transactionHistory,
  locations,
} from '../data/mockData';

type SliderView = 'Transactions' | 'Allocated' | 'Reserves' | 'On Transfer' | 'History';

interface SliderPanelProps {
  item: InventoryItem | null;
  onClose: () => void;
}

export default function SliderPanel({ item, onClose }: SliderPanelProps) {
  const [view, setView] = useState<SliderView>('Transactions');
  const [transactionType, setTransactionType] = useState('Create/Add');
  const [quantity, setQuantity] = useState('');
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [selectedBay, setSelectedBay] = useState('');
  const [grade, setGrade] = useState('1');
  const [stage, setStage] = useState('Growing');
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const itemAllocated = allocatedOrders[item.id] || [];
  const itemReserves = reserves[item.id] || [];
  const itemTransfers = transfers[item.id] || [];
  const itemHistory = transactionHistory[item.id] || [];

  const getViewCount = (viewName: SliderView) => {
    switch (viewName) {
      case 'Allocated':
        return itemAllocated.length;
      case 'Reserves':
        return itemReserves.length;
      case 'On Transfer':
        return itemTransfers.length;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    alert(`Transaction submitted:\nType: ${transactionType}\nQuantity: ${quantity}\nLocation: ${selectedSite} > ${selectedHouse} > ${selectedBay}\nGrade: ${grade}\nStage: ${stage}\nNotes: ${notes}`);
  };

  const availableHouses = selectedSite ? locations.houses[selectedSite as keyof typeof locations.houses] || [] : [];
  const availableBays = selectedHouse ? locations.bays[selectedHouse as keyof typeof locations.bays] || [] : [];

  return (
    <Box
      sx={{
        width: 380,
        minWidth: 380,
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #E5E7EB' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 600 }}>
            {item.itemName}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1, textAlign: 'center', borderColor: '#E5E7EB' }}
          >
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
              Available
            </Typography>
            <Typography sx={{ fontWeight: 600, color: '#10B981' }}>
              {item.available.toLocaleString()}
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1, textAlign: 'center', borderColor: '#E5E7EB' }}
          >
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
              Allocated
            </Typography>
            <Typography sx={{ fontWeight: 600, color: '#F59E0B' }}>
              {item.allocated.toLocaleString()}
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1, textAlign: 'center', borderColor: '#E5E7EB' }}
          >
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
              Reserved
            </Typography>
            <Typography sx={{ fontWeight: 600, color: '#6366F1' }}>
              {item.reserves.toLocaleString()}
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{ flex: 1, p: 1, textAlign: 'center', borderColor: '#E5E7EB' }}
          >
            <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
              On Hand
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{item.onHand.toLocaleString()}</Typography>
          </Paper>
        </Box>
      </Box>

      {/* View Selector */}
      <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #E5E7EB' }}>
        <FormControl fullWidth size="small">
          <InputLabel>View</InputLabel>
          <Select value={view} label="View" onChange={(e) => setView(e.target.value as SliderView)}>
            <MenuItem value="Transactions">Transactions</MenuItem>
            <MenuItem value="Allocated">
              Allocated {getViewCount('Allocated') ? `(${getViewCount('Allocated')})` : ''}
            </MenuItem>
            <MenuItem value="Reserves">
              Reserves {getViewCount('Reserves') ? `(${getViewCount('Reserves')})` : ''}
            </MenuItem>
            <MenuItem value="On Transfer">On Transfer</MenuItem>
            <MenuItem value="History">History</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {view === 'Transactions' && (
          <Box>
            <Typography variant="h2" sx={{ mb: 2 }}>
              New Transaction
            </Typography>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={transactionType}
                label="Transaction Type"
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <MenuItem value="Create/Add">Create/Add</MenuItem>
                <MenuItem value="Move">Move</MenuItem>
                <MenuItem value="Scrap">Scrap</MenuItem>
                <MenuItem value="Adjust">Adjust</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#374151' }}>
              Location
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <ToggleButtonGroup
                value={selectedSite}
                exclusive
                onChange={(_, val) => {
                  setSelectedSite(val || '');
                  setSelectedHouse('');
                  setSelectedBay('');
                }}
                size="small"
              >
                {locations.sites.map((site) => (
                  <ToggleButton key={site} value={site} sx={{ px: 2, fontSize: '0.75rem' }}>
                    {site}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {selectedSite && (
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>House</InputLabel>
                <Select
                  value={selectedHouse}
                  label="House"
                  onChange={(e) => {
                    setSelectedHouse(e.target.value);
                    setSelectedBay('');
                  }}
                >
                  {availableHouses.map((house) => (
                    <MenuItem key={house} value={house}>
                      {house}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {selectedHouse && (
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Bay</InputLabel>
                <Select value={selectedBay} label="Bay" onChange={(e) => setSelectedBay(e.target.value)}>
                  {availableBays.map((bay) => (
                    <MenuItem key={bay} value={bay}>
                      {bay}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Grade</InputLabel>
              <Select value={grade} label="Grade" onChange={(e) => setGrade(e.target.value)}>
                <MenuItem value="1">Grade 1</MenuItem>
                <MenuItem value="2">Grade 2</MenuItem>
                <MenuItem value="3">Grade 3</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Stage</InputLabel>
              <Select value={stage} label="Stage" onChange={(e) => setStage(e.target.value)}>
                <MenuItem value="Growing">Growing</MenuItem>
                <MenuItem value="Ready">Ready</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Notes (Optional)"
              multiline
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this transaction"
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#BA3636',
                '&:hover': { backgroundColor: '#8B2929' },
              }}
            >
              Submit Transaction
            </Button>
          </Box>
        )}

        {view === 'Allocated' && (
          <Box>
            {itemAllocated.length === 0 ? (
              <Typography sx={{ color: '#6B7280', textAlign: 'center', py: 4 }}>
                No allocations
              </Typography>
            ) : (
              <List disablePadding>
                {itemAllocated.map((order) => (
                  <Paper key={order.orderId} variant="outlined" sx={{ mb: 1, p: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 500 }}>{order.orderId}</Typography>
                      <Link href="#" sx={{ fontSize: '0.75rem' }}>
                        View Details
                      </Link>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      {order.customer}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2">
                        Qty: <strong>{order.qtyAllocated}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        Ship: {order.shipDate}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        )}

        {view === 'Reserves' && (
          <Box>
            {itemReserves.length === 0 ? (
              <Typography sx={{ color: '#6B7280', textAlign: 'center', py: 4 }}>
                No reservations
              </Typography>
            ) : (
              <List disablePadding>
                {itemReserves.map((reserve) => (
                  <Paper key={reserve.reserveId} variant="outlined" sx={{ mb: 1, p: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 500 }}>{reserve.reserveId}</Typography>
                      <Link href="#" sx={{ fontSize: '0.75rem' }}>
                        View Details
                      </Link>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      {reserve.customer}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2">
                        Qty: <strong>{reserve.qty}</strong>
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        Expires: {reserve.expiry}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        )}

        {view === 'On Transfer' && (
          <Box>
            {itemTransfers.length === 0 ? (
              <Typography sx={{ color: '#6B7280', textAlign: 'center', py: 4 }}>
                No active transfers
              </Typography>
            ) : (
              <List disablePadding>
                {itemTransfers.map((transfer) => (
                  <Paper key={transfer.toId} variant="outlined" sx={{ mb: 1, p: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 500 }}>{transfer.toId}</Typography>
                      <Chip
                        label={transfer.status}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          backgroundColor: transfer.status === 'In Transit' ? '#FEF3C7' : '#E5E7EB',
                          color: transfer.status === 'In Transit' ? '#92400E' : '#374151',
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      {transfer.fromLocation} → {transfer.toLocation}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Qty: <strong>{transfer.qty}</strong>
                    </Typography>
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        )}

        {view === 'History' && (
          <Box>
            {itemHistory.length === 0 ? (
              <Typography sx={{ color: '#6B7280', textAlign: 'center', py: 4 }}>
                No transaction history
              </Typography>
            ) : (
              <List disablePadding>
                {itemHistory.map((txn) => (
                  <Paper key={txn.id} variant="outlined" sx={{ mb: 1, p: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Chip
                        label={txn.type}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          backgroundColor:
                            txn.type === 'Add'
                              ? '#D1FAE5'
                              : txn.type === 'Scrap'
                              ? '#FEE2E2'
                              : txn.type === 'Move'
                              ? '#DBEAFE'
                              : '#E5E7EB',
                          color:
                            txn.type === 'Add'
                              ? '#065F46'
                              : txn.type === 'Scrap'
                              ? '#991B1B'
                              : txn.type === 'Move'
                              ? '#1E40AF'
                              : '#374151',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
                        {txn.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2">
                        Qty:{' '}
                        <strong style={{ color: txn.qty > 0 ? '#10B981' : '#EF4444' }}>
                          {txn.qty > 0 ? '+' : ''}
                          {txn.qty}
                        </strong>
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        by {txn.user}
                      </Typography>
                    </Box>
                    {txn.notes && (
                      <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5, fontStyle: 'italic' }}>
                        "{txn.notes}"
                      </Typography>
                    )}
                  </Paper>
                ))}
              </List>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
