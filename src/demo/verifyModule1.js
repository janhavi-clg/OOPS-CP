import { module1Service } from '../modules/module1/module1Service.js';
import { rahulDemoProfile, rahulDeveloperLinks, rahulHackathons } from './rahulDemoData.js';

async function testModule1() {
  console.log('==================================================');
  console.log('DEVTRACK MODULE 1 FULL ACCEPTANCE TEST SUITE');
  console.log('==================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition, description) {
    if (condition) {
      console.log(`[PASS] ${description}`);
      passed++;
    } else {
      console.error(`[FAIL] ${description}`);
      failed++;
    }
  }

  // 1. Profile Verification
  const initialProfile = await module1Service.getProfile();
  assert(initialProfile.name === 'Rahul', 'Initial profile returns Rahul');
  assert(initialProfile.college.includes('Apex'), 'Initial college is Apex Institute');
  assert(initialProfile.year === 'Second Year', 'Year is Second Year');
  assert(initialProfile.branch === 'CSE (AI/ML)', 'Branch is CSE (AI/ML)');

  // 2. Profile Editing & Persistence
  const updatedProfile = await module1Service.updateProfile({
    bio: 'Updated bio for testing persistence across sessions.',
    phone: '+91 91234 56789',
    developerStatus: 'AI/ML Researcher & Competitive Programmer'
  });
  assert(updatedProfile.bio === 'Updated bio for testing persistence across sessions.', 'Bio was updated successfully');
  assert(updatedProfile.phone === '+91 91234 56789', 'Phone was updated successfully');

  // Verify fetch returns updated profile
  const reloadedProfile = await module1Service.getProfile();
  assert(reloadedProfile.bio === 'Updated bio for testing persistence across sessions.', 'Updated bio persisted in service storage');

  // 3. Avatar Upload & Removal
  const avatarResult = await module1Service.uploadAvatar('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
  assert(avatarResult.avatarUrl.startsWith('data:image'), 'Avatar upload stores image data URL');

  const removedAvatarResult = await module1Service.removeAvatar();
  assert(removedAvatarResult.avatarUrl === null, 'Avatar removal resets to null');

  // 4. Developer Links Listing
  const initialLinks = await module1Service.getDeveloperLinks();
  assert(initialLinks.length >= 6, `Initial developer links count is ${initialLinks.length} (>= 6)`);
  assert(initialLinks.some(l => l.platform === 'GitHub'), 'GitHub link is present');
  assert(initialLinks.some(l => l.platform === 'LeetCode'), 'LeetCode link is present');
  assert(initialLinks.some(l => l.platform === 'LinkedIn'), 'LinkedIn link is present');

  // 5. Add Custom Developer Link (URL validation)
  try {
    await module1Service.addDeveloperLink({
      platform: 'InvalidLink',
      url: 'ftp://not-a-valid-web-url',
      username: 'test'
    });
    assert(false, 'Should reject invalid URL scheme');
  } catch (err) {
    assert(true, 'Properly rejected invalid URL scheme for developer link');
  }

  const newLink = await module1Service.addDeveloperLink({
    platform: 'Kaggle',
    url: 'https://kaggle.com/rahul_grandmaster',
    username: 'rahul_grandmaster',
    isCustom: true
  });
  assert(newLink.id && newLink.platform === 'Kaggle', 'Added custom Kaggle developer link');

  // Verify link exists in list
  const linksAfterAdd = await module1Service.getDeveloperLinks();
  assert(linksAfterAdd.some(l => l.id === newLink.id), 'New Kaggle link persisted in links list');

  // 6. Edit Developer Link
  const editedLink = await module1Service.updateDeveloperLink(newLink.id, {
    platform: 'Kaggle Master',
    url: 'https://kaggle.com/rahul_master',
    username: 'rahul_master'
  });
  assert(editedLink.platform === 'Kaggle Master', 'Developer link successfully updated');

  // 7. Delete Developer Link
  await module1Service.deleteDeveloperLink(newLink.id);
  const linksAfterDelete = await module1Service.getDeveloperLinks();
  assert(!linksAfterDelete.some(l => l.id === newLink.id), 'Developer link successfully deleted');

  // 8. Hackathons Listing
  const initialHacks = await module1Service.getHackathons();
  assert(initialHacks.length >= 3, `Initial hackathons count is ${initialHacks.length} (>= 3)`);
  assert(initialHacks.some(h => h.name.includes('Hack Celestial')), 'Hack Celestial 3.0 present');
  assert(initialHacks.some(h => h.platform === 'Unstop'), 'Unstop hackathon present');

  // 9. Add Hackathon
  try {
    await module1Service.addHackathon({ name: '' });
    assert(false, 'Should reject empty hackathon name');
  } catch (e) {
    assert(true, 'Properly rejected empty hackathon name');
  }

  const newHack = await module1Service.addHackathon({
    name: 'National CleanTech Hackathon 2026',
    platform: 'Unstop',
    eventUrl: 'https://unstop.com/hackathons/cleantech-2026',
    startDate: '2026-12-01',
    endDate: '2026-12-03',
    registrationDeadline: '2026-11-20',
    submissionDeadline: '2026-12-03',
    resultDate: '2026-12-10',
    status: 'Upcoming',
    teamName: 'EcoCoders',
    teamSize: 4,
    achievement: 'Registered',
    description: 'Renewable energy load balancing simulation using reinforcement learning.',
    notes: 'Submitted abstract proposal.'
  });
  assert(newHack.id && newHack.name === 'National CleanTech Hackathon 2026', 'Added new CleanTech hackathon');

  // Verify persistence in list
  const hacksAfterAdd = await module1Service.getHackathons();
  assert(hacksAfterAdd.some(h => h.id === newHack.id), 'New hackathon persisted in list');

  // 10. Edit Hackathon
  const editedHack = await module1Service.updateHackathon(newHack.id, {
    name: 'National CleanTech Hackathon 2026',
    platform: 'Unstop',
    eventUrl: 'https://unstop.com/hackathons/cleantech-2026',
    status: 'Won',
    achievement: 'First Prize - Clean Energy Track',
    notes: 'Won 1st prize ₹50,000 and mentorship grant'
  });
  assert(editedHack.status === 'Won', 'Hackathon status updated to Won');
  assert(editedHack.achievement.includes('First Prize'), 'Hackathon achievement updated');

  // 11. Search & Filter
  const unstopOnly = await module1Service.getHackathons('All', 'CleanTech');
  assert(unstopOnly.some(h => h.id === newHack.id), 'Search by query "CleanTech" returns the hackathon');

  const wonOnly = await module1Service.getHackathons('Won', '');
  assert(wonOnly.every(h => h.status === 'Won'), 'Filter by status "Won" returns only Won hackathons');

  // 12. Delete Hackathon
  await module1Service.deleteHackathon(newHack.id);
  const hacksAfterDelete = await module1Service.getHackathons();
  assert(!hacksAfterDelete.some(h => h.id === newHack.id), 'Hackathon entry deleted successfully');

  console.log('==================================================');
  console.log(`MODULE 1 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

testModule1();
