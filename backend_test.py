import requests
import sys
from datetime import datetime

class YouTubeThumbnailAPITester:
    def __init__(self, base_url="https://thumbgrabber.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.content:
                    try:
                        json_response = response.json()
                        print(f"   Response: {json_response}")
                        return True, json_response
                    except:
                        print(f"   Response: {response.text[:200]}...")
                        return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )
        return success

    def test_extract_valid_youtube_url(self):
        """Test thumbnail extraction with valid YouTube URL"""
        test_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        success, response = self.run_test(
            "Extract Thumbnails - Valid URL",
            "POST",
            "api/extract",
            200,
            data={"url": test_url}
        )
        
        if success and response:
            # Verify response structure
            if 'video_id' in response and 'thumbnails' in response:
                print(f"   ✅ Video ID: {response['video_id']}")
                thumbnails = response['thumbnails']
                expected_qualities = ['maxres', 'sd', 'hq', 'mq', 'default']
                for quality in expected_qualities:
                    if quality in thumbnails:
                        print(f"   ✅ {quality}: {thumbnails[quality]}")
                    else:
                        print(f"   ❌ Missing {quality} thumbnail")
                        return False
                return True
            else:
                print(f"   ❌ Invalid response structure")
                return False
        return success

    def test_extract_invalid_youtube_url(self):
        """Test thumbnail extraction with invalid YouTube URL"""
        test_url = "https://www.google.com"
        success, response = self.run_test(
            "Extract Thumbnails - Invalid URL",
            "POST",
            "api/extract",
            400,
            data={"url": test_url}
        )
        return success

    def test_extract_empty_url(self):
        """Test thumbnail extraction with empty URL"""
        success, response = self.run_test(
            "Extract Thumbnails - Empty URL",
            "POST",
            "api/extract",
            422,  # FastAPI validation error
            data={"url": ""}
        )
        return success

    def test_extract_different_youtube_formats(self):
        """Test different YouTube URL formats"""
        test_urls = [
            "https://youtu.be/dQw4w9WgXcQ",
            "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "https://www.youtube.com/shorts/dQw4w9WgXcQ"
        ]
        
        all_passed = True
        for i, test_url in enumerate(test_urls):
            success, response = self.run_test(
                f"Extract Thumbnails - Format {i+1}",
                "POST",
                "api/extract",
                200,
                data={"url": test_url}
            )
            if not success:
                all_passed = False
        
        return all_passed

def main():
    print("🚀 Starting YouTube Thumbnail API Tests...")
    print("=" * 50)
    
    # Setup
    tester = YouTubeThumbnailAPITester()

    # Run tests
    tests = [
        tester.test_api_root,
        tester.test_extract_valid_youtube_url,
        tester.test_extract_invalid_youtube_url,
        tester.test_extract_empty_url,
        tester.test_extract_different_youtube_formats
    ]

    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.tests_run += 1

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests Summary: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())