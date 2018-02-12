const socialTransformers = {
  cryptokitties: id => `https://www.cryptokitties.co/profile/${id}`,
  facebook: id => `https://facebook.com/${id}`,
  twitter: id => `https://twitter.com/${id}`,
  youtube: id => `https://www.youtube.com/user/${id}`,
  instagram: id => `https://instagram.com/${id}`,
  github: id => `https://github.com/${id}`,
  bitcoin: id => `https://blockchain.info/address/${id}`,
  ethereum: id => `https://etherscan.io/address/${id}`,
};

export const transform = (socialId, id) => socialTransformers[socialId](id);

export default [
  { id: 'cryptokitties', icon: 'cryptokitties', color: '#8a3ab9', name: 'CryptoKitties' },
  { id: 'facebook', icon: 'facebook', color: '#3b5998', name: 'Facebook' },
  { id: 'twitter', icon: 'twitter', color: '#00aced', name: 'Twitter' },
  { id: 'youtube', icon: 'youtube', color: '#ff0202', name: 'YouTube' },
  { id: 'instagram', icon: 'instagram', color: '#8a3ab9', name: 'Instagram' },
  { id: 'github', icon: 'github', color: 'black', name: 'GitHub' },
  { id: 'bitcoin', icon: 'bitcoin', color: '#ff9900', name: 'Bitcoin' },
  { id: 'ethereum', icon: 'ethereum', color: '#3c3c3d', name: 'Ethereum' },
];
