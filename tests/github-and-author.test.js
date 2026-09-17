const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const REPO_URL = 'https://github.com/TysonTranThai/modeltier';
const AUTHOR_URL = 'https://github.com/TysonTranThai';

test('GitHub & Author Support: i18n translations exist for vi and en', () => {
  const i18nPath = path.join(__dirname, '../src/data/i18n.ts');
  assert.ok(fs.existsSync(i18nPath), 'i18n.ts must exist');
  const content = fs.readFileSync(i18nPath, 'utf8');

  // Check vi
  assert.ok(content.includes('githubRepo'), 'vi must define githubRepo');
  assert.ok(content.includes('starRepo'), 'vi must define starRepo');
  assert.ok(content.includes('followAuthor'), 'vi must define followAuthor');
  assert.ok(content.includes('supportAuthor'), 'vi must define supportAuthor');
  assert.ok(content.includes('TysonTranThai'), 'vi must reference TysonTranThai');

  // Check en
  assert.ok(content.includes('GitHub Repository'), 'en must define GitHub Repository');
  assert.ok(content.includes('Follow Author'), 'en must define Follow Author');
});

test('Navbar: Contains prominent GitHub repository and Author follow links in desktop and mobile drawer', () => {
  const navbarPath = path.join(__dirname, '../src/components/Navbar.tsx');
  assert.ok(fs.existsSync(navbarPath), 'Navbar.tsx must exist');
  const content = fs.readFileSync(navbarPath, 'utf8');

  assert.ok(content.includes(REPO_URL), 'Navbar must link to GitHub repo URL');
  assert.ok(content.includes(AUTHOR_URL), 'Navbar must link to Author GitHub profile');
  assert.ok(content.includes('mobileMenuOpen'), 'Navbar must have mobile menu drawer');
  assert.ok(content.includes('Follow Tác Giả') || content.includes('Follow Author'), 'Navbar must have Follow Author button');
});

test('Hero (Easy Mode): Contains GitHub repo and Author follow links', () => {
  const heroPath = path.join(__dirname, '../src/components/Hero.tsx');
  assert.ok(fs.existsSync(heroPath), 'Hero.tsx must exist');
  const content = fs.readFileSync(heroPath, 'utf8');

  assert.ok(content.includes(REPO_URL), 'Hero must link to GitHub repo URL');
  assert.ok(content.includes(AUTHOR_URL), 'Hero must link to Author GitHub profile');
  assert.ok(content.includes('TysonTranThai/modeltier'), 'Hero must display repository name');
});

test('ProCloneHero (Pro Mode): Contains GitHub repo and Author follow links', () => {
  const proHeroPath = path.join(__dirname, '../src/components/ProCloneHero.tsx');
  assert.ok(fs.existsSync(proHeroPath), 'ProCloneHero.tsx must exist');
  const content = fs.readFileSync(proHeroPath, 'utf8');

  assert.ok(content.includes(REPO_URL), 'ProCloneHero must link to GitHub repo URL');
  assert.ok(content.includes(AUTHOR_URL), 'ProCloneHero must link to Author GitHub profile');
});

test('Footer: Contains dedicated Author Support box and Open Source community links', () => {
  const footerPath = path.join(__dirname, '../src/components/Footer.tsx');
  assert.ok(fs.existsSync(footerPath), 'Footer.tsx must exist');
  const content = fs.readFileSync(footerPath, 'utf8');

  assert.ok(content.includes(REPO_URL), 'Footer must link to GitHub repo URL');
  assert.ok(content.includes(AUTHOR_URL), 'Footer must link to Author GitHub profile');
  assert.ok(content.includes('Tyson Tran'), 'Footer must mention Tyson Tran');
  assert.ok(content.includes('modeltier/issues'), 'Footer must link to issues tracker');
  assert.ok(content.includes('modeltier.notlimitedteam.cloud'), 'Footer must preserve domain');
});
