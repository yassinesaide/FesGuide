import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  CircularProgress,
  Avatar,
  Alert,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingBag,
  Download,
  Map,
  Schedule,
  AccessTime,
  PhotoCamera,
  Hotel,
  AccountBalanceWallet,
  LocalOffer,
  Assessment,
  LockPerson,
  Logout,
  Person,
  SupervisorAccount,
  Search,
  CheckCircle,
  Cancel,
  Edit,
  Save,
  Close,
} from "@mui/icons-material";
import paymentService, {
  Transaction,
  ProductType,
  RentalDuration,
  premiumAudioTours,
  digitalMaps,
  itineraryOptions,
  virtualGuideOptions,
  photoLocations,
  affiliateHotels,
} from "../services/paymentService";
import authService from "../services/authService";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState("");
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Check admin status on component mount
  useEffect(() => {
    const adminStatus = authService.isAdmin();
    setIsAdmin(adminStatus);

    // Get current user details
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.name || currentUser.username);
    }

    // If not admin, we don't need to run this effect
    // as the ProtectedRoute will redirect them
  }, [navigate]);

  // For demo purposes, let's initialize with some sample transactions
  useEffect(() => {
    // Only load data if user is admin
    if (!isAdmin) return;

    // This would fetch from a real API in a production app
    const loadData = async () => {
      setIsLoading(true);

      try {
        // Simulate some user purchases
        if (transactions.length === 0) {
          await paymentService.purchaseAudioTour("medina-secrets");
          await paymentService.purchaseDigitalMap("artisan-map");
          await paymentService.rentVirtualGuide("guide-24h");
          // Admin would be able to see all transactions in a real app
        }

        // Get user transactions
        const userTransactions = paymentService.getUserTransactions();
        setTransactions(userTransactions);

        // Get passive income stats
        const incomeStats = paymentService.getPassiveIncomeStats();
        setStats(incomeStats);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isAdmin, transactions.length]);

  // Fetch users for admin
  useEffect(() => {
    // Only fetch users if user is admin
    if (!isAdmin) return;

    // For demo purposes, we'll create some sample users
    // In a real app, this would be an API call
    const fetchUsers = async () => {
      // Simulated users for demonstration
      const mockUsers = [
        {
          id: "user-1",
          name: "John Doe",
          email: "john@example.com",
          role: "user",
          isPremium: true,
          joinDate: "2023-10-15",
          lastLogin: "2023-11-28",
        },
        {
          id: "user-2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "user",
          isPremium: false,
          joinDate: "2023-09-22",
          lastLogin: "2023-11-25",
        },
        {
          id: "user-3",
          name: "Admin User",
          email: "admin@fesguide.com",
          role: "admin",
          isPremium: true,
          joinDate: "2023-08-01",
          lastLogin: "2023-11-29",
        },
        {
          id: "user-4",
          name: "Mohammed Alami",
          email: "mohammed@example.com",
          role: "guide",
          isPremium: true,
          joinDate: "2023-10-05",
          lastLogin: "2023-11-27",
        },
        {
          id: "user-5",
          name: "Sara Hassan",
          email: "sara@example.com",
          role: "user",
          isPremium: false,
          joinDate: "2023-11-10",
          lastLogin: "2023-11-22",
        },
      ];

      setUsers(mockUsers);
    };

    fetchUsers();
  }, [isAdmin]);

  // Handle role editing
  const startEditRole = (user: any) => {
    setEditingUserId(user.id);
    setEditRole(user.role);
  };

  const cancelEditRole = () => {
    setEditingUserId(null);
  };

  const saveRole = (userId: string) => {
    // In a real app, this would call an API
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: editRole } : user
      )
    );
    setEditingUserId(null);
  };

  // Toggle premium status
  const togglePremium = (userId: string) => {
    // In a real app, this would call an API
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isPremium: !user.isPremium } : user
      )
    );
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Transform data for charts
  const prepareRevenueChartData = () => {
    return [
      { name: "Audio Tours", value: stats.audioTourRevenue || 0 },
      { name: "Digital Maps", value: stats.digitalMapRevenue || 0 },
      { name: "Itineraries", value: stats.itineraryRevenue || 0 },
      { name: "Virtual Guide", value: stats.virtualGuideRevenue || 0 },
      { name: "Photo Spots", value: stats.photoLocationRevenue || 0 },
      { name: "Affiliate", value: stats.affiliateRevenue || 0 },
    ];
  };

  // Chart colors
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // Helper functions to get product details
  const getProductTitle = (transaction: Transaction): string => {
    switch (transaction.productType) {
      case ProductType.AUDIO_TOUR:
        return (
          premiumAudioTours.find((t) => t.id === transaction.productId)
            ?.title || "Audio Tour"
        );
      case ProductType.DIGITAL_MAP:
        return (
          digitalMaps.find((m) => m.id === transaction.productId)?.title ||
          "Digital Map"
        );
      case ProductType.CUSTOM_ITINERARY:
        return (
          itineraryOptions.find((i) => i.id === transaction.productId)?.title ||
          "Custom Itinerary"
        );
      case ProductType.VIRTUAL_GUIDE:
        const guide = virtualGuideOptions.find(
          (o) => o.id === transaction.productId
        );
        return guide ? `${guide.hours}-Hour Virtual Guide` : "Virtual Guide";
      case ProductType.PHOTO_LOCATION:
        return (
          photoLocations.find((l) => l.id === transaction.productId)?.title ||
          "Photo Location"
        );
      case ProductType.AFFILIATE_BOOKING:
        return (
          affiliateHotels.find((h) => h.id === transaction.productId)?.name ||
          "Hotel Booking"
        );
      default:
        return "Unknown Product";
    }
  };

  const getProductIcon = (type: ProductType) => {
    switch (type) {
      case ProductType.AUDIO_TOUR:
        return <ShoppingBag />;
      case ProductType.DIGITAL_MAP:
        return <Map />;
      case ProductType.CUSTOM_ITINERARY:
        return <Schedule />;
      case ProductType.VIRTUAL_GUIDE:
        return <AccessTime />;
      case ProductType.PHOTO_LOCATION:
        return <PhotoCamera />;
      case ProductType.AFFILIATE_BOOKING:
        return <Hotel />;
      default:
        return <LocalOffer />;
    }
  };

  // If not admin, show access denied message
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 mt-20 mb-8 text-center">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-8 shadow-lg animate-fade-in">
          <div className="text-red-600 text-5xl mb-4">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Admin Access Required
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to view this dashboard. You will be
            redirected to the login page.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 mt-16 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-fes-blue border-t-transparent rounded-full animate-spin"></div>
        <h2 className="mt-4 text-xl text-gray-600">
          Loading your dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <i className="fas fa-user text-fes-blue mr-2"></i>
            <span className="text-gray-700">{userName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <i className="fas fa-sign-out-alt text-gray-600"></i>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-8">
          {["My Purchases", "Virtual Guide", "Analytics", "Users"].map(
            (tab, index) => (
              <button
                key={index}
                onClick={() => setTabValue(index)}
                className={`pb-4 px-2 text-lg font-medium transition-colors duration-300 ${
                  tabValue === index
                    ? "text-fes-blue border-b-2 border-fes-blue"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {/* My Purchases Tab */}
        {tabValue === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-fes-blue/10 rounded-full flex items-center justify-center mr-4">
                      {getProductIcon(transaction.productType)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {getProductTitle(transaction)}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {transaction.timestamp.toLocaleDateString()}
                  </p>
                  <p className="text-2xl font-bold text-fes-blue mt-2">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {transaction.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <button className="text-fes-blue hover:text-fes-teal transition-colors duration-300 flex items-center">
                    <i className="fas fa-download mr-2"></i>
                    Access Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Virtual Guide Tab */}
        {tabValue === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {paymentService.hasActiveVirtualGuide() ? (
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-fes-blue rounded-full flex items-center justify-center mr-6">
                    <i className="fas fa-user-tie text-3xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Your Virtual Guide is Active
                    </h3>
                    <p className="text-gray-500">
                      Expires:{" "}
                      {localStorage.getItem("virtualGuideExpiry")
                        ? new Date(
                            localStorage.getItem("virtualGuideExpiry") as string
                          ).toLocaleString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <button className="p-4 border-2 border-fes-blue rounded-xl hover:bg-fes-blue/5 transition-colors duration-300">
                    Ask a Question
                  </button>
                  <button className="p-4 border-2 border-fes-blue rounded-xl hover:bg-fes-blue/5 transition-colors duration-300">
                    Get Recommendations
                  </button>
                  <button className="p-4 border-2 border-fes-blue rounded-xl hover:bg-fes-blue/5 transition-colors duration-300">
                    Get Directions
                  </button>
                  <button className="p-4 border-2 border-fes-blue rounded-xl hover:bg-fes-blue/5 transition-colors duration-300">
                    Plan My Day
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="fas fa-user-slash text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  No Active Virtual Guide
                </h3>
                <p className="text-gray-600 mb-8">
                  Get personalized assistance during your trip to Fes
                </p>
                <button className="bg-fes-blue text-white px-8 py-3 rounded-full hover:bg-fes-teal transition-colors duration-300">
                  Rent a Virtual Guide
                </button>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {tabValue === 2 && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-gray-500 mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {formatCurrency(stats.totalRevenue || 0)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  From {stats.transactionCount || 0} transactions
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-gray-500 mb-2">Best Seller</h3>
                <p className="text-3xl font-bold text-gray-800">Audio Tours</p>
                <p className="text-sm text-gray-500 mt-2">
                  {formatCurrency(stats.audioTourRevenue || 0)} in sales
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-gray-500 mb-2">Growth</h3>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-gray-800">+12%</p>
                  <span className="text-green-500 ml-2">↑</span>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Revenue by Product
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareRevenueChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip
                        formatter={(value) => formatCurrency(value as number)}
                      />
                      <Bar
                        dataKey="value"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Distribution
                </h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prepareRevenueChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {prepareRevenueChartData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value) => formatCurrency(value as number)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {tabValue === 3 && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fes-blue/20"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-600">
                        User
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-600">
                        Role
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-600">
                        Premium
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-600">
                        Joined
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-fes-blue/10 flex items-center justify-center mr-3">
                              <span className="text-fes-blue font-medium">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-800">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-4 px-4">
                          {editingUserId === user.id ? (
                            <select
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value)}
                              className="border border-gray-200 rounded px-2 py-1"
                            >
                              <option value="user">User</option>
                              <option value="guide">Guide</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                user.role === "admin"
                                  ? "bg-fes-blue/10 text-fes-blue"
                                  : user.role === "guide"
                                  ? "bg-fes-teal/10 text-fes-teal"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {user.role.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${
                              user.isPremium ? "bg-green-500" : "bg-gray-300"
                            }`}
                            onClick={() => togglePremium(user.id)}
                          >
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                                user.isPremium ? "left-7" : "left-1"
                              }`}
                            ></div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {user.joinDate}
                        </td>
                        <td className="py-4 px-4">
                          {editingUserId === user.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => saveRole(user.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <i className="fas fa-check"></i>
                              </button>
                              <button
                                onClick={cancelEditRole}
                                className="text-red-600 hover:text-red-700"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditRole(user)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {users.length}
                </p>
                <p className="text-gray-500 mt-2">Total Users</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter((u) => u.isPremium).length}
                </p>
                <p className="text-gray-500 mt-2">Premium Users</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter((u) => u.role === "admin").length}
                </p>
                <p className="text-gray-500 mt-2">Admins</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter((u) => u.role === "guide").length}
                </p>
                <p className="text-gray-500 mt-2">Guides</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
