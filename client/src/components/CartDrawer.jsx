import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { backdropVariants, drawerRight, fadeUp, spring, staggerContainer } from '../lib/motion';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              variants={drawerRight}
              initial="hidden"
              animate="show"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) onClose();
              }}
              className="panel flex w-screen max-w-md flex-col justify-between border-l shadow-float"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-invert text-invert-fg">
                    <ShoppingBag className="h-[18px] w-[18px] stroke-[1.75]" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold text-fg">Your cart</h2>
                    <p className="text-xs text-muted">
                      {totalItems === 0 ? 'Empty' : `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-xl text-muted transition-colors hover:bg-elevated hover:text-fg"
                >
                  <X className="h-[18px] w-[18px]" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-4 py-16 text-center"
                  >
                    <motion.div
                      variants={fadeUp}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-elevated text-subtle"
                    >
                      <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-1">
                      <h3 className="text-[15px] font-semibold text-fg">Your cart is empty</h3>
                      <p className="mx-auto max-w-xs text-[12px] text-muted">
                        Explore the collection and add your favorite products.
                      </p>
                    </motion.div>
                    <motion.button
                      variants={fadeUp}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      transition={spring}
                      onClick={onClose}
                      className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-invert px-4 py-2.5 text-xs font-medium text-invert-fg shadow-soft transition-shadow hover:shadow-lift"
                    >
                      Start shopping
                      <ArrowRight className="h-3.5 w-3.5" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3.5">
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          variants={fadeUp}
                          initial="hidden"
                          animate="show"
                          exit={{ opacity: 0, x: 40, transition: { duration: 0.22 } }}
                          className="panel-inset group flex items-center gap-3.5 rounded-3xl p-3.5"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-16 w-16 shrink-0 rounded-2xl border border-line bg-elevated object-cover"
                          />

                          <div className="min-w-0 flex-1 space-y-1">
                            <h4 className="truncate text-[13px] font-semibold text-fg">
                              {item.name}
                            </h4>
                            <span className="block text-[11px] text-subtle">
                              {item.category}
                            </span>
                            <div className="font-mono text-[13px] font-semibold text-fg">
                              ${item.price}
                              <span className="ml-1 text-[10px] font-normal text-subtle">× {item.quantity}</span>
                            </div>
                          </div>

                          <div className="flex h-full shrink-0 flex-col items-end justify-between gap-2">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 text-subtle transition-colors hover:text-clay-600 dark:hover:text-clay-400"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </motion.button>

                            <div className="flex items-center gap-1 rounded-xl border border-line bg-surface p-0.5">
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="grid h-6 w-6 place-items-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-fg"
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <span className="min-w-[18px] text-center font-mono text-xs font-bold text-fg">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="grid h-6 w-6 place-items-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-fg"
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden border-t border-line bg-elevated/40 p-6"
                  >
                    <div className="space-y-2 text-[12px]">
                      <div className="flex justify-between text-muted">
                        <span>Subtotal</span>
                        <span className="font-mono text-fg">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Shipping</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Free</span>
                      </div>
                      <div className="flex justify-between border-t border-line pt-2.5 text-sm font-semibold text-fg">
                        <span>Total</span>
                        <span className="font-mono text-base">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={spring}
                        onClick={() => alert(`Proceeding to checkout with total: $${subtotal.toFixed(2)}`)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-invert py-3.5 text-sm font-semibold text-invert-fg shadow-soft transition-shadow hover:shadow-lift"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Proceed to checkout
                      </motion.button>

                      <button
                        onClick={onClearCart}
                        className="block w-full py-1 text-center text-xs font-medium text-muted transition-colors hover:text-clay-600 dark:hover:text-clay-400"
                      >
                        Clear shopping cart
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
