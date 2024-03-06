/* 
Broken firewall
    Tickets in hand, you board your rocket flight ready for your vacation. Just as you are settling into your seat, the pilot can be heard on the speaker system. It seems they are having some issues with the onboard network and are looking for a Computer Scientist to help them out. Keen to see if you can get a free upgrade as a reward, you volunteer your services!
    It seems the network router has been accidentally reset and is blocking legitimate traffic between the rocket systems and mission control, while simultaneously also allowing the onboard passengers to overwhelm the wifi.
    On inspection, you determine the router is using Internet Protocol version 4. You setup a data logger and record the IP headers of 1000 packets for analysis, your input data.
    Speaking to the captain, you are advised that internal ship systems are in the 192.168.0.0 through to 192.168.254.254 IP address range, while passenger wifi is on the 10.0.0.0 to 10.0.254.254 IP address range. Any other addresses are external to the ship (for instance the ship control center, space traffic control, or just other internet locations for passenger web browsing).
    To start with, you decide to determine the ratio of network traffic that originates or is destined for the ships internal systems, compared to that which originates or is destined for the passenger wifi.
    . . .
    // https://codingquest.io/problem/29
*/
const fs = require("fs");
const { BlockList } = require("net");

function HexToIPv4(hex) {
  let convertedValue = "";
  for (let i = 0; i < hex.length; i++) {
    convertedValue += parseInt(hex[i] + hex[++i], 16);
    if (i != hex.length - 1) {
      convertedValue += ".";
    }
  }
  return convertedValue;
}

function ReadPacketInput(pathToFile) {
  let packets = null;
  try {
    packets = fs.readFileSync(pathToFile, "utf8").split("\r\n");
  } catch (err) {
    console.error(err);
  }

  return packets;
}

function GetPacketPart(packet, byteSize, shift) {
  shift++;
  if (shift - 1 < 0) {
    shift = 1;
  }

  const packetLength = packet.length;
  return packet.substring(
    packetLength - byteSize * shift,
    packetLength - byteSize * (shift - 1)
  );
}

const internalShipsRange = new BlockList();
internalShipsRange.addRange("192.168.0.0", "192.168.254.254");
const passengerWifiRange = new BlockList();
passengerWifiRange.addRange("10.0.0.0", "10.0.254.254");

let internalShipByteSize = 0;
let passengerWifiByteSize = 0;

let packets = ReadPacketInput("input.txt");
packets.forEach((packet) => {
  const packetSizeHex = packet.substring(4, 8);
  const packetSize = parseInt(packetSizeHex, 16);
  const IPByteSize = 8;

  const sourceIPHex = GetPacketPart(packet, IPByteSize, 1);
  const destIPHex = GetPacketPart(packet, IPByteSize, 0);
  const sourceIP = HexToIPv4(sourceIPHex);
  const destIP = HexToIPv4(destIPHex);

  if (internalShipsRange.check(sourceIP) || internalShipsRange.check(destIP)) {
    internalShipByteSize += packetSize;
  } else if (
    passengerWifiRange.check(sourceIP) ||
    passengerWifiRange.check(destIP)
  ) {
    passengerWifiByteSize += packetSize;
  }
});

console.log(`${internalShipByteSize}/${passengerWifiByteSize}`);
