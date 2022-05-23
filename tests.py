import unittest
from app import app ,db
from app.models import User, Puzzle


class TestWebApp(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_password_hashing(self):
        u = User(username='cam')
        u.create_hash('cam123')
        self.assertFalse(u.check_password('cam321'))
        self.assertFalse(u.check_password('cam123456'))
        self.assertTrue(u.check_password('cam123'))

    def test_puzzle_first(self):
        p = Puzzle(word='lettuce', wordType='Noun', definition='A cultivated plant of the daisy family, with edible leaves that are eaten in salads.', sentence="‘Verlaine's chine was stuffed with leeks, spring onions, [REDACTED], raspberry leaves, parsley, thyme and marjoram.’")
        self.assertFalse(p.getPuzzleFirst() == "h")
        self.assertTrue(p.getPuzzleFirst() == "l")

        p2 = Puzzle(word='annoy', wordType='Verb', definition='Make (someone) a little angry; irritate.', sentence="‘the decision really [REDACTED]ed him’")
        self.assertFalse(p2.getPuzzleFirst() == "k")
        self.assertTrue(p2.getPuzzleFirst() == "a")

if __name__ == '__main__':
    unittest.main(verbosity=2)