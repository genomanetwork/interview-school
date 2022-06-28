'use strict';

const os = require('os');

export function getIp() {
  let ifaces = os.networkInterfaces();
  let address = null;

  Object.keys(ifaces).map((ifname) => {
    let alias = 0;

    ifaces[ifname].forEach((iface) => {
      if ('IPv4' !== iface.family || iface.internal !== false){
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1){
        // this single interface has multiple ipv4 addresses
        console.info('This single interface has multiple ipv4 addresses ::: ', {[ifname]: alias, address:iface.address});
      } else {
        // this interface has only one ipv4 adress
        address = iface.address;
        return;
      }
      ++alias;
    });
  });

  if (address !== null){
    return address;
  } else {
    return '127.0.0.1';
  }
}
