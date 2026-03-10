import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, CreditCard, FileText, PieChart, LifeBuoy, 
  ArrowUp, CheckCircle, Search, Bell, Settings, Menu, X, ChevronRight,
  BarChart3, Percent, DollarSign
} from 'lucide-react';

export default function DashboardPage({ onNavigate, onOpenModal }: { onNavigate: (path: string) => void, onOpenModal: (title: string, content: React.ReactNode) => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const businessName = "Demo Business LLC";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-charcoal-dark font-sans text-offwhite selection:bg-teal selection:text-white flex overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-charcoal border-r border-white/5 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-white/5 justify-between md:justify-start">
            <button onClick={() => onNavigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,5 15,70 50,95" fill="#008080" />
                <polygon points="50,5 85,70 50,95" fill="#4A4A4A" />
                <polygon points="15,70 30,65 50,80 50,95" fill="#008080" />
              </svg>
              <span className="font-serif text-lg font-medium text-white tracking-wide">Keystone</span>
            </button>
            <button className="md:hidden text-offwhite/50 hover:text-white" onClick={toggleSidebar}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-8 space-y-2">
            {[
              { name: 'Overview', icon: LayoutDashboard, active: true },
              { name: 'Transactions', icon: CreditCard },
              { name: 'Statements', icon: FileText },
              { name: 'Fee Analysis', icon: PieChart },
              { name: 'Support', icon: LifeBuoy }
            ].map((item, i) => (
              <a key={i} href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-teal/10 text-teal border border-teal/20' : 'text-offwhite/60 hover:text-white hover:bg-white/5'}`}>
                <item.icon className={`w-5 h-5 ${item.active ? 'text-teal' : 'text-offwhite/40'}`} />
                {item.name}
              </a>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5">
            <div className="bg-slate-dark/40 rounded-lg p-4 border border-white/5">
              <div className="text-xs text-offwhite/50 uppercase mb-1">Account Manager</div>
              <div className="text-sm text-white font-medium mb-2">Seth Redford</div>
              <button className="text-xs text-teal hover:text-teal-soft transition-colors flex items-center gap-1">
                Contact Support <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        {/* Top bar */}
        <header className="h-16 bg-charcoal/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-offwhite/60 hover:text-white" onClick={toggleSidebar}>
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-xl text-white">Welcome, {businessName}</h1>
          </div>
          <div className="flex items-center gap-4 text-offwhite/60">
            <button className="hover:text-white transition-colors"><Search className="w-5 h-5" /></button>
            <button className="hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-teal rounded-full"></span>
            </button>
            <button className="hover:text-white transition-colors"><Settings className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-full bg-slate-dark border border-white/10 flex items-center justify-center text-sm ml-2 text-white font-medium">
              DB
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1">
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Left/Main Column */}
            <div className="xl:col-span-3 space-y-8">
              
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  title="Monthly Volume" 
                  value="$45,200" 
                  icon={BarChart3} 
                />
                <div className="bg-charcoal/40 border border-teal/30 p-5 rounded-xl flex flex-col shadow-[0_0_15px_rgba(0,128,128,0.1)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-teal/5 pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className="text-sm text-offwhite/60 font-medium">Processing Fees</span>
                    <Percent className="w-5 h-5 text-teal/50" />
                  </div>
                  <div className="text-2xl font-mono text-white mb-2 font-medium relative z-10">$0.00</div>
                  <div className="mt-auto flex items-center gap-1.5 text-xs text-teal font-medium relative z-10 bg-teal/10 w-fit px-2 py-1 rounded inline-flex">
                    <CheckCircle className="w-3 h-3" /> Edge Program Active
                  </div>
                </div>
                <StatCard 
                  title="Net Deposits" 
                  value="$45,200" 
                  icon={ArrowUp} 
                />
                <StatCard 
                  title="Monthly Savings" 
                  value="$1,450" 
                  icon={ArrowUp} 
                  trend="+2.4%"
                  trendUp={true}
                />
              </div>

              {/* Chart Activity */}
              <div className="bg-charcoal/40 border border-white/5 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-white">Processing Volume — Last 6 Months</h2>
                  <select className="bg-charcoal border border-white/10 text-offwhite/80 text-sm rounded px-3 py-1 outline-none">
                    <option>Last 6 Months</option>
                    <option>Year to Date</option>
                  </select>
                </div>
                
                <div className="h-64 relative w-full flex items-end justify-between pt-10 pb-6 px-4">
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-6 opacity-10 pointer-events-none">
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                  </div>
                  
                  {/* Simple SVG Line Chart */}
                  <svg className="absolute inset-0 w-full h-full pt-10 pb-6 px-4" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#008080" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#008080" stopOpacity="0.0"/>
                    </linearGradient>
                    <path d="M0,100 L0,70 L20,60 L40,80 L60,40 L80,50 L100,20 L100,100 Z" fill="url(#chartGradient)" />
                    <path d="M0,70 L20,60 L40,80 L60,40 L80,50 L100,20" fill="none" stroke="#008080" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Points */}
                    <circle cx="0" cy="70" r="1.5" fill="#008080" />
                    <circle cx="20" cy="60" r="1.5" fill="#008080" />
                    <circle cx="40" cy="80" r="1.5" fill="#008080" />
                    <circle cx="60" cy="40" r="1.5" fill="#white" stroke="#008080" strokeWidth="1" />
                    <circle cx="80" cy="50" r="1.5" fill="#008080" />
                    <circle cx="100" cy="20" r="1.5" fill="#008080" />
                  </svg>
                  
                  {/* X Axis Labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-xs text-offwhite/40">
                    <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-charcoal/40 border border-white/5 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">Recent Transactions</h2>
                  <button className="text-sm text-teal hover:text-white transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-offwhite/80">
                    <thead className="bg-white/5 text-offwhite/50 uppercase tracking-wider text-xs">
                      <tr>
                        <th className="px-6 py-3 font-medium">Date & Time</th>
                        <th className="px-6 py-3 font-medium">Description</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { date: 'Today, 2:45 PM', desc: 'Custom Order #4421', amount: '$124.50', status: 'Completed' },
                        { date: 'Today, 1:12 PM', desc: 'Online Checkout', amount: '$85.00', status: 'Completed' },
                        { date: 'Today, 10:30 AM', desc: 'POS Sale', amount: '$420.75', status: 'Completed' },
                        { date: 'Yesterday, 4:18 PM', desc: 'Invoice #INV-299', amount: '$1,250.00', status: 'Pending' },
                        { date: 'Yesterday, 2:05 PM', desc: 'POS Sale', amount: '$18.25', status: 'Completed' },
                      ].map((tx, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-offwhite/70">{tx.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-white">{tx.desc}</td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono">{tx.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tx.status === 'Completed' ? 'bg-teal/10 text-teal border border-teal/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Fee Savings Highlight */}
              <div className="bg-charcoal-dark border border-white/10 rounded-xl overflow-hidden relative shadow-lg">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-[40px] mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="p-6 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-teal mb-4 border border-teal/30">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">You've saved <span className="text-teal font-medium tracking-tight">$8,700</span> this year with Keystone.</h3>
                  <p className="text-sm text-offwhite/60 font-light mb-6 leading-relaxed">By utilizing The Edge Program, you've completely eliminated your processing fees, keeping 100% of your revenue.</p>
                  
                  <div className="bg-white/5 rounded-lg p-4 flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-offwhite/50">YTD Volume</span>
                      <span className="font-mono text-offwhite/80">$290,000</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-offwhite/50">Standard Fees (2.9%)</span>
                      <span className="font-mono text-offwhite/80 line-through">$8,410</span>
                    </div>
                    <div className="h-[1px] bg-white/10 my-1"></div>
                    <div className="flex justify-between text-sm">
                      <span className="text-teal font-medium">Actual Fees Paid</span>
                      <span className="font-mono text-teal font-medium">$0.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show-case CTA */}
              <div className="bg-teal/10 border border-teal/20 rounded-xl p-6 text-center shadow-[0_0_30px_rgba(0,128,128,0.1)]">
                <h3 className="text-white font-medium mb-2">Want this for your business?</h3>
                <p className="text-xs text-offwhite/60 mb-6 leading-relaxed">This is a showcase of the Keystone merchant portal. Experience true transparency and savings.</p>
                <button 
                  onClick={() => {
                    // Navigate back home then open modal, or just trigger callback if passing action
                    window.location.href = '/#contact';
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-teal text-white text-sm font-medium rounded transition-all hover:bg-teal-soft"
                >
                  Book a Call →
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendUp }: any) {
  return (
    <div className="bg-charcoal/40 border border-white/5 p-5 rounded-xl flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-offwhite/60 font-medium">{title}</span>
        <Icon className="w-5 h-5 text-offwhite/40" />
      </div>
      <div className="text-2xl font-mono text-white mb-2 font-medium">{value}</div>
      <div className="mt-auto">
        {trend ? (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-teal' : 'text-red-400'}`}>
            {trend} from last month
          </div>
        ) : (
          <div className="text-xs text-transparent">No change</div>
        )}
      </div>
    </div>
  );
}
