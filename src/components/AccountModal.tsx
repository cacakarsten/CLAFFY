import React from 'react';
import { PageType, OrderRecord } from '../types';
import { X, Heart, Package, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: OrderRecord[];
  onTrackOrder: (orderId: string) => void;
  setCurrentPage: (page: PageType) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  onTrackOrder,
  setCurrentPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#7B4D31]/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF4AA] w-full max-w-lg rounded-2xl border-2 border-[#7B4D31] shadow-[6px_8px_0px_#7B4D31] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-[#FEE873] border-b-2 border-[#7B4D31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F7B915] border border-[#7B4D31] flex items-center justify-center text-[#6E0300] font-bold text-sm">
              C
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#6E0300]">Bloom Keeper Account</h3>
              <p className="text-[11px] text-[#7B4D31]">Your memories & orders</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#7B4D31] bg-white text-[#7B4D31] hover:bg-[#FAF4AA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-[#7B4D31]">
          {/* Member Card */}
          <div className="p-4 rounded-xl bg-white border border-[#7B4D31] shadow-[2px_3px_0px_#7B4D31] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#AC7753]">CLAFFY Memory Club</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FAF4AA] text-[#6E0300] text-[10px] font-bold border border-[#7B4D31]">
                Master Crafter Tier
              </span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#6E0300]">Bloom Creator</h4>
            <p className="text-xs text-[#7B4D31] mt-1">Ready to create blooms that celebrate life’s unforgettable moments.</p>
          </div>

          {/* Recent Orders Section */}
          <div>
            <h5 className="font-serif text-base font-bold text-[#6E0300] mb-2 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#7B4D31]" />
              <span>Recent Orders ({recentOrders.length})</span>
            </h5>

            {recentOrders.length === 0 ? (
              <div className="p-4 rounded-xl bg-white/70 border border-dashed border-[#AC7753] text-center text-xs text-[#AC7753]">
                No orders placed yet in this session.
              </div>
            ) : (
              <div className="space-y-2">
                {recentOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-3 bg-white rounded-xl border border-[#7B4D31] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#7B4D31]">
                        <span>#{ord.orderId}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FEE873] border border-[#7B4D31] text-[#6E0300]">
                          {ord.kind === 'custom' ? 'Custom Studio' : 'Ready-Made'}
                        </span>
                      </div>
                      <p className="text-[#AC7753] mt-0.5">
                        {ord.items.length} item(s) • {formatPrice(ord.total)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onTrackOrder(ord.orderId);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#F7B915] text-[#6E0300] border border-[#7B4D31] font-bold text-[11px] flex items-center gap-1 hover:bg-[#FEE873]"
                    >
                      <span>Track Order</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setCurrentPage('customizer');
                onClose();
              }}
              className="p-3 rounded-xl bg-[#FAF4AA] border border-[#7B4D31] text-left hover:bg-[#FEE873] transition"
            >
              <Sparkles className="w-4 h-4 text-[#6E0300] mb-1" />
              <p className="font-bold text-xs text-[#7B4D31]">Start New Custom</p>
              <p className="text-[10px] text-[#AC7753]">Create your personalized bloom</p>
            </button>

            <button
              onClick={() => {
                setCurrentPage('order-tracking');
                onClose();
              }}
              className="p-3 rounded-xl bg-[#FAF4AA] border border-[#7B4D31] text-left hover:bg-[#FEE873] transition"
            >
              <Clock className="w-4 h-4 text-[#7B4D31] mb-1" />
              <p className="font-bold text-xs text-[#7B4D31]">Track Any Order</p>
              <p className="text-[10px] text-[#AC7753]">Enter tracking code</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
