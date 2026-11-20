"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCreditCard,
  FaMinus,
  FaPlus,
  FaSearch,
  FaSeedling,
  FaShoppingBasket,
  FaTools,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import { LogoutButton } from "@/components/AppShell/components/LogoutButton";
import { paymentMethods } from "@/shared/data/grains.data";
import { formatCurrency } from "@/shared";
import type { Currency, RegisterInvoiceRequest } from "@/shared/types/api.types";
import { convertCurrency, EXCHANGE_RATE_NIO_PER_USD, roundCurrency } from "@/shared/utils/currency";
import { getImageKitUrl } from "@/utils/imagekit";

export type CashierProduct = {
  id: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  currency: Currency;
  unit?: string;
  imageUrl?: string | null;
};

type CartLine = CashierProduct & { quantity: number };

type CashierScreenProps = {
  module: "hardware" | "grains";
  products: CashierProduct[];
  isLoading: boolean;
  isSubmitting: boolean;
  error?: string;
  onCheckout: (request: RegisterInvoiceRequest) => Promise<void>;
};

const palette = {
  background: "#f3f6fb",
  surface: "#ffffff",
  ink: "#122342",
  muted: "#71809a",
  line: "#e1e8f2",
  blue: "#244596",
  blueSoft: "#edf3ff",
  green: "#087f71",
  greenSoft: "#e8f8f2",
};

export function CashierScreen({
  module,
  products,
  isLoading,
  isSubmitting,
  error,
  onCheckout,
}: CashierScreenProps) {
  const router = useRouter();
  const { showError } = useToast();
  const summaryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [searchShortcutLabel, setSearchShortcutLabel] = useState("Ctrl K");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [currency, setCurrency] = useState<Currency>("NIO");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [cashierName] = useState(() => {
    if (typeof window === "undefined") return "Usuario";
    return (
      window.localStorage.getItem("username") ??
      window.sessionStorage.getItem("username") ??
      "Usuario"
    );
  });

  useEffect(() => {
    setSearchShortcutLabel(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K");

    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.activeElement === searchInputRef.current && search) {
        setSearch("");
        return;
      }

      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, [contenteditable]")
      ) {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, [search]);

  const isHardware = module === "hardware";
  const accent = isHardware ? palette.blue : palette.green;
  const accentSoft = isHardware ? palette.blueSoft : palette.greenSoft;
  const accentBorder = isHardware ? "#cad9f5" : "#b5e7dc";
  const title = isHardware ? "Caja de hogar" : "Caja de granos básicos";
  const cashierInitials = cashierName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return products.filter(
      (product) => !term || `${product.name} ${product.code}`.toLocaleLowerCase().includes(term),
    );
  }, [products, search]);

  const itemCount = cart.reduce((count, line) => count + line.quantity, 0);
  const cartCurrency = cart[0]?.currency;
  const total = roundCurrency(
    cart.reduce(
      (sum, line) =>
        sum + roundCurrency(convertCurrency(line.price * line.quantity, line.currency, currency)),
      0,
    ),
  );
  const priceInCurrency = (line: CashierProduct, amount: number) =>
    roundCurrency(convertCurrency(amount, line.currency, currency));

  // Step 2 means the cart is ready for payment. Step 3 is only shown during checkout.
  const activeStep = isSubmitting ? 3 : cart.length > 0 ? 2 : 1;

  const addToCart = (product: CashierProduct) => {
    if (product.stock <= 0 || isSubmitting) return;
    if (cartCurrency && product.currency !== cartCurrency) {
      showError(
        `La factura solo admite productos en ${cartCurrency}. Vacía la factura para agregar productos en otra moneda.`,
      );
      return;
    }
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      if (!existing) return [...current, { ...product, quantity: 1 }];
      return current.map((line) =>
        line.id === product.id
          ? { ...line, quantity: Math.min(line.quantity + 1, product.stock) }
          : line,
      );
    });
    if (!cartCurrency) setCurrency(product.currency);
  };

  const updateQuantity = (id: string, delta: number) => {
    if (isSubmitting) return;
    setCart((current) =>
      current
        .map((line) =>
          line.id === id
            ? { ...line, quantity: Math.max(0, Math.min(line.stock, line.quantity + delta)) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  };

  const submit = async () => {
    if (!cart.length || isSubmitting) return;
    try {
      await onCheckout({
        items: cart.map(({ id, quantity }) => ({ productId: id, quantity })),
        paymentMethod,
      });
      setCart([]);
    } catch (checkoutError) {
      showError(
        checkoutError instanceof Error ? checkoutError.message : "No se pudo completar la factura.",
      );
    }
  };

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: palette.background, color: palette.ink }}>
      {/* Main header */}
      <Box
        component="header"
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: 76,
          bgcolor: palette.surface,
          borderBottom: `1px solid ${palette.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
          <IconButton
            aria-label="Volver a las cajas"
            onClick={() => router.replace("/pos")}
            sx={{ color: palette.blue }}
          >
            <FaArrowLeft size={16} />
          </IconButton>
          <Box>
            <Typography
              sx={{ fontSize: 10, letterSpacing: ".12em", fontWeight: 900, color: palette.blue }}
            >
              ASSET HUB · PUNTO DE VENTA
            </Typography>
            <Typography component="h1" sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 900 }}>
              {title}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
          <Avatar
            sx={{
              display: { xs: "none", sm: "flex" },
              width: 36,
              height: 36,
              bgcolor: palette.blueSoft,
              color: palette.blue,
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            {cashierInitials || "US"}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" }, minWidth: 0 }}>
            <Typography noWrap sx={{ fontSize: 12, fontWeight: 800, maxWidth: 120 }}>
              {cashierName}
            </Typography>
            <Typography sx={{ fontSize: 10, color: palette.muted }}>Cajero</Typography>
          </Box>
          <Box sx={{ width: { xs: 90, sm: 125 } }}>
            <LogoutButton />
          </Box>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 1.5, sm: 2.5, lg: 3 },
          pt: { xs: 2, md: 3.5 },
          pb: { xs: 15, md: 5 },
        }}
      >
        <Box
          sx={{
            px: { xs: 2.5, md: 3 },
            py: 2.7,
            mb: 2,
            bgcolor: "white",
            border: `1px solid ${palette.line}`,
            borderRadius: 2,
            boxShadow: "0 10px 28px rgba(24,49,89,.035)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{ color: accent, fontSize: 10, fontWeight: 900, letterSpacing: ".13em" }}
            >
              VENTA EN PROCESO
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 27, md: 32 },
                fontWeight: 900,
                letterSpacing: "-.045em",
                mt: 0.35,
              }}
            >
              Tu carrito<span style={{ color: accent }}>.</span>
            </Typography>
            <Typography sx={{ color: palette.muted, fontSize: 12, mt: 0.2 }}>
              Agrega productos, revisa las cantidades y genera una factura.
            </Typography>
          </Box>
          <Chip
            label="Venta abierta"
            icon={<Box sx={{ width: 7, height: 7, bgcolor: "#10b981", borderRadius: "50%" }} />}
            sx={{
              bgcolor: palette.greenSoft,
              border: "1px solid #abe7d3",
              color: palette.green,
              fontWeight: 800,
              fontSize: 11,
              "& .MuiChip-icon": { ml: 1.3 },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 350px" },
            gap: 2.5,
            alignItems: "start",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 1.5,
              }}
            >
              <Box>
                <Typography component="h3" sx={{ fontSize: 18, fontWeight: 900 }}>
                  Agregar productos
                </Typography>
                <Typography sx={{ color: palette.muted, fontSize: 12, mt: 0.2 }}>
                  Selecciona del inventario para añadirlos a la factura.
                </Typography>
              </Box>
              <Chip
                size="small"
                label={`${products.filter((product) => product.stock > 0).length} disponibles`}
                sx={{
                  flexShrink: 0,
                  bgcolor: "white",
                  color: accent,
                  fontWeight: 800,
                  fontSize: 10,
                }}
              />
            </Box>
            <TextField
              fullWidth
              size="small"
              inputRef={searchInputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar producto por nombre o código"
              slotProps={{
                htmlInput: { "aria-label": "Buscar productos" },
                input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch size={14} color={palette.muted} />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Limpiar búsqueda"
                      size="small"
                      onClick={() => setSearch("")}
                      edge="end"
                      sx={{ color: palette.muted, mr: -0.5 }}
                    >
                      <FaTimes size={12} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <Box
                      component="kbd"
                      aria-hidden="true"
                      sx={{
                        px: 0.75,
                        py: 0.35,
                        border: `1px solid ${palette.line}`,
                        borderRadius: 1,
                        bgcolor: palette.background,
                        color: palette.muted,
                        fontFamily: "inherit",
                        fontSize: 10,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {searchShortcutLabel}
                    </Box>
                  </InputAdornment>
                ),
                },
              }}
              sx={{
                mb: 2,
                bgcolor: "white",
                borderRadius: 2.5,

                "& .MuiOutlinedInput-root": {
                  minHeight: 48,
                  borderRadius: 2.5,
                  transition: "box-shadow .18s ease, background-color .18s ease",
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#aebdd2" },
                  "&.Mui-focused": {
                    bgcolor: "white",
                    boxShadow: `0 0 0 3px ${accent}18`,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: accent,
                    borderWidth: 1.5,
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#cfdbeb" },
                "& .MuiInputBase-input": { fontSize: 13 },
                "& .MuiInputBase-input::placeholder": { opacity: 1, color: "#8794a9" },
              }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {cartCurrency && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Esta factura está en {cartCurrency}. Para cambiar de moneda, vacía la factura antes
                de agregar otros productos.
              </Alert>
            )}
            <Box
              sx={{
                height: { xs: "auto", lg: "clamp(280px, calc(100dvh - 440px), 560px)" },
                minHeight: 0,
                overflowY: { xs: "visible", lg: "auto" },
                overflowX: "hidden",
                overscrollBehaviorY: "contain",
                scrollbarGutter: { lg: "stable" },
                pr: { lg: 0.75 },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2,minmax(0,1fr))",
                    sm: "repeat(auto-fill,minmax(176px,1fr))",
                  },
                  gap: { xs: 1.2, sm: 1.6 },
                }}
              >
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} variant="rounded" height={268} sx={{ borderRadius: 3 }} />
                    ))
                  : visibleProducts.map((product) => {
                      const inCart = cart.find((line) => line.id === product.id)?.quantity ?? 0;
                      const hasDifferentCurrency = Boolean(
                        cartCurrency && product.currency !== cartCurrency,
                      );
                      const canAdd = product.stock > inCart && !isSubmitting && !hasDifferentCurrency;
                      return (
                        <Box
                          key={product.id}
                          sx={{
                            minWidth: 0,
                            overflow: "hidden",
                            bgcolor: "white",
                            border: `1px solid ${inCart > 0 ? accentBorder : palette.line}`,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 4px 16px rgba(24,49,89,.04)",
                            transition:
                              "transform .16s ease, box-shadow .16s ease, border-color .16s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 10px 24px rgba(24,49,89,.09)",
                              borderColor: accentBorder,
                            },
                          }}
                        >
                          <Box
                            role="img"
                            aria-label={`Imagen de ${product.name}`}
                            sx={{
                              height: { xs: 108, sm: 124 },
                              display: "grid",
                              placeItems: "center",
                              color: accent,
                              bgcolor: accentSoft,
                              backgroundImage: product.imageUrl
                                ? `url("${getImageKitUrl(product.imageUrl, { width: 600, height: 400, quality: 80, format: "auto" })}")`
                                : `linear-gradient(135deg, ${accentSoft}, ${accentBorder})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            {!product.imageUrl &&
                              (isHardware ? <FaTools size={32} /> : <FaSeedling size={32} />)}
                          </Box>
                          <Box
                            sx={{
                              p: { xs: 1.25, sm: 1.5 },
                              display: "flex",
                              flexDirection: "column",
                              flex: 1,
                              minWidth: 0,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 0.5,
                                mb: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 9,
                                  color: accent,
                                  fontWeight: 900,
                                  letterSpacing: ".08em",
                                }}
                              >
                                {isHardware ? "HOGAR" : "GRANOS"}
                              </Typography>
                              <Chip
                                size="small"
                                label={product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                                sx={{
                                  height: 21,
                                  maxWidth: "70%",
                                  bgcolor: product.stock > 0 ? palette.greenSoft : "#fff1f2",
                                  color: product.stock > 0 ? palette.green : "#be123c",
                                  fontSize: 9,
                                  fontWeight: 800,
                                  "& .MuiChip-label": {
                                    px: 0.7,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  },
                                }}
                              />
                            </Box>
                            <Typography
                              sx={{
                                fontSize: { xs: 12.5, sm: 14 },
                                lineHeight: 1.3,
                                fontWeight: 900,
                                minHeight: 36,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              sx={{
                                mt: 0.45,
                                mb: 1.5,
                                color: palette.muted,
                                fontSize: 10,
                                overflowWrap: "anywhere",
                              }}
                            >
                              {product.code}
                              {product.unit ? ` · ${product.unit}` : ""}
                            </Typography>
                            <Box
                              sx={{
                                mt: "auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 900,
                                  color: palette.blue,
                                  fontSize: { xs: 13, sm: 15 },
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {formatCurrency(product.price, product.currency)}
                              </Typography>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<FaPlus size={10} />}
                                onClick={() => addToCart(product)}
                                disabled={!canAdd}
                                sx={{
                                  flexShrink: 0,
                                  minWidth: 0,
                                  px: 1.1,
                                  minHeight: 32,
                                  bgcolor: palette.blue,
                                  textTransform: "none",
                                  fontSize: 10,
                                  fontWeight: 900,
                                  borderRadius: 1.7,
                                  boxShadow: "none",
                                  "& .MuiButton-startIcon": { mr: 0.6 },
                                }}
                              >
                                Añadir
                              </Button>
                            </Box>
                            {inCart > 0 && (
                              <Typography
                                sx={{ color: accent, mt: 0.8, fontSize: 10, fontWeight: 800 }}
                              >
                                {inCart} en la factura
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
              </Box>
            </Box>
            {!isLoading && visibleProducts.length === 0 && (
              <Box sx={{ textAlign: "center", py: 7, color: palette.muted }}>
                <FaSearch size={22} />
                <Typography sx={{ mt: 1.4, fontSize: 13 }}>
                  No encontramos productos con esa búsqueda.
                </Typography>
                <Button onClick={() => setSearch("")} sx={{ textTransform: "none" }}>
                  Limpiar búsqueda
                </Button>
              </Box>
            )}
            {!isLoading && products.length > 0 && (
              <Box
                sx={{
                  mt: 3,
                  px: 2,
                  py: 1.5,
                  border: "1px dashed #c8d7e9",
                  borderRadius: 2.5,
                  bgcolor: "#ffffffa8",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: palette.blueSoft,
                    color: palette.blue,
                  }}
                >
                  <FaBoxOpen size={17} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 850 }}>
                    Inventario disponible
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: palette.muted }}>
                    {products.length} productos cargados para esta caja.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Invoice summary */}
          <Box
            ref={summaryRef}
            component="aside"
            sx={{
              minWidth: 0,
              bgcolor: "white",
              border: `1px solid ${palette.line}`,
              borderRadius: 2,
              boxShadow: "0 10px 30px rgba(24,49,89,.06)",
              p: { xs: 2, sm: 2.3 },
              display: "flex",
              flexDirection: "column",
              minHeight: 530,
              height: { xs: "auto", lg: "min(720px, calc(100dvh - 110px))" },
              position: { lg: "sticky" },
              top: { lg: 16 },
              scrollMarginTop: 20,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <Typography
                  sx={{ color: accent, fontSize: 10, fontWeight: 900, letterSpacing: ".12em" }}
                >
                  RESUMEN DE ORDEN
                </Typography>
                <Typography sx={{ mt: 0.45, fontSize: 21, fontWeight: 900 }}>Tu factura</Typography>
              </Box>
              <Chip
                size="small"
                label={`${cart.length} productos`}
                sx={{ bgcolor: accentSoft, color: accent, fontWeight: 850, fontSize: 10 }}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ flex: 1, minHeight: 140, overflowY: "auto", overflowX: "hidden", pr: 0.25 }}>
              {cart.length === 0 ? (
                <Box
                  sx={{
                    minHeight: 210,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    color: palette.muted,
                  }}
                >
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 3,
                      bgcolor: accentSoft,
                      color: accent,
                      display: "grid",
                      placeItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <FaShoppingBasket size={22} />
                  </Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 850, color: "#64748b" }}>
                    El carrito está vacío
                  </Typography>
                  <Typography sx={{ fontSize: 11, mt: 0.5 }}>
                    Agrega productos para iniciar la factura.
                  </Typography>
                </Box>
              ) : (
                cart.map((line) => (
                  <Box key={line.id} sx={{ py: 1.3, borderBottom: `1px solid ${palette.line}` }}>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          color: accent,
                          bgcolor: accentSoft,
                          backgroundImage: line.imageUrl
                            ? `url("${getImageKitUrl(line.imageUrl, { width: 160, height: 160, quality: 75, format: "auto" })}")`
                            : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {!line.imageUrl &&
                          (isHardware ? <FaTools size={17} /> : <FaSeedling size={17} />)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography noWrap sx={{ fontSize: 12, fontWeight: 850 }}>
                          {line.name}
                        </Typography>
                        <Typography sx={{ fontSize: 10, color: palette.muted }}>
                          {formatCurrency(priceInCurrency(line, line.price), currency)} c/u
                          {line.unit ? ` · ${line.unit}` : ""}
                        </Typography>
                        {line.currency !== currency && (
                          <Typography sx={{ fontSize: 9, color: palette.muted }}>
                            Original: {formatCurrency(line.price, line.currency)}
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        aria-label={`Quitar ${line.name}`}
                        size="small"
                        disabled={isSubmitting}
                        onClick={() =>
                          setCart((current) => current.filter((item) => item.id !== line.id))
                        }
                        sx={{ color: "#94a3b8" }}
                      >
                        <FaTrash size={12} />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                        <IconButton
                          aria-label={`Disminuir cantidad de ${line.name}`}
                          size="small"
                          disabled={isSubmitting}
                          onClick={() => updateQuantity(line.id, -1)}
                          sx={{
                            bgcolor: palette.background,
                            borderRadius: 1.5,
                            width: 26,
                            height: 26,
                          }}
                        >
                          <FaMinus size={9} />
                        </IconButton>
                        <Typography
                          sx={{ minWidth: 20, textAlign: "center", fontWeight: 900, fontSize: 12 }}
                        >
                          {line.quantity}
                        </Typography>
                        <IconButton
                          aria-label={`Aumentar cantidad de ${line.name}`}
                          size="small"
                          disabled={isSubmitting || line.quantity >= line.stock}
                          onClick={() => updateQuantity(line.id, 1)}
                          sx={{
                            bgcolor: palette.background,
                            borderRadius: 1.5,
                            width: 26,
                            height: 26,
                          }}
                        >
                          <FaPlus size={9} />
                        </IconButton>
                      </Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 900 }}>
                        {formatCurrency(
                          priceInCurrency(line, line.price * line.quantity),
                          currency,
                        )}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
            <Divider sx={{ my: 1.8 }} />
            <Typography
              sx={{
                fontSize: 10,
                letterSpacing: ".04em",
                color: palette.muted,
                fontWeight: 900,
                mb: 0.7,
              }}
            >
              MONEDA DE LA FACTURA
            </Typography>
            <Select
              size="small"
              fullWidth
              value={currency}
              disabled={isSubmitting || Boolean(cartCurrency)}
              onChange={(event) => setCurrency(event.target.value as Currency)}
              sx={{ borderRadius: 2, mb: 0.5, fontSize: 12 }}
            >
              <MenuItem value="NIO">Córdobas (C$)</MenuItem>
              <MenuItem value="USD">Dólares (US$)</MenuItem>
            </Select>
            <Typography sx={{ fontSize: 10, color: palette.muted, mb: 1.6 }}>
              Tasa aplicada: 1 USD = C${EXCHANGE_RATE_NIO_PER_USD.toFixed(2)}
            </Typography>
            <Typography
              sx={{
                fontSize: 10,
                letterSpacing: ".04em",
                color: palette.muted,
                fontWeight: 900,
                mb: 0.7,
              }}
            >
              MÉTODO DE PAGO
            </Typography>
            <Select
              size="small"
              fullWidth
              value={paymentMethod}
              disabled={isSubmitting}
              onChange={(event) => setPaymentMethod(event.target.value)}
              sx={{ borderRadius: 2, fontSize: 12 }}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                mb: 1.4,
              }}
            >
              <Typography sx={{ fontWeight: 850, fontSize: 14 }}>Total</Typography>
              <Typography
                sx={{
                  fontWeight: 950,
                  fontSize: { xs: 21, sm: 23 },
                  color: palette.blue,
                  overflowWrap: "anywhere",
                  textAlign: "right",
                }}
              >
                {formatCurrency(total, currency)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              disabled={!cart.length || isSubmitting}
              startIcon={<FaCreditCard size={14} />}
              onClick={() => void submit()}
              sx={{
                minHeight: 46,
                borderRadius: 2.5,
                bgcolor: palette.blue,
                fontWeight: 900,
                textTransform: "none",
                boxShadow: "none",
                fontSize: 12,
              }}
            >
              {isSubmitting ? "Procesando factura…" : "Cobrar y generar factura"}
            </Button>
            {cart.length > 0 && (
              <Button
                fullWidth
                disabled={isSubmitting}
                onClick={() => setCart([])}
                sx={{ mt: 0.6, color: palette.muted, fontSize: 11, textTransform: "none" }}
              >
                Vaciar carrito
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Compact mobile checkout bar */}
      {cart.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            display: { xs: "flex", lg: "none" },
            bottom: "calc(10px + env(safe-area-inset-bottom))",
            left: 10,
            right: 10,
            alignItems: "center",
            gap: 1,
            zIndex: 20,
            p: 1.2,
            bgcolor: "white",
            border: `1px solid ${palette.line}`,
            borderRadius: 3,
            boxShadow: "0 12px 40px rgba(22,43,75,.18)",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ color: palette.muted, fontSize: 10 }}>
              {cart.length} productos · {itemCount} unidades
            </Typography>
            <Typography sx={{ color: palette.blue, fontWeight: 950, fontSize: 16 }}>
              {formatCurrency(total, currency)}
            </Typography>
          </Box>
          <Button
            onClick={() =>
              summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            sx={{ fontWeight: 850, textTransform: "none", color: palette.blue, minWidth: 60 }}
          >
            Revisar
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={() =>
              summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            variant="contained"
            sx={{
              bgcolor: palette.blue,
              fontWeight: 900,
              textTransform: "none",
              boxShadow: "none",
              borderRadius: 2,
            }}
          >
            Ir a pagar
          </Button>
        </Box>
      )}
    </Box>
  );
}
