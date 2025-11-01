import { Question } from '@/types/quiz';

export const pythonQuestions: Question[] = [
  // EASY LEVEL - 30 questions
  {
    question: "Which command would you use to verify the Python version installed on your system?",
    options: [
      "python --version",
      "python -v",
      "python version",
      "python --check-version"
    ],
    correct: 0,
    explanation: "The 'python --version' command displays the installed Python version.",
    difficulty: 'easy'
  },
  {
    question: "If you want to create a virtual environment for your Python project, which command should you execute?",
    options: [
      "python -m venv myenv",
      "python create-venv myenv",
      "python venv create myenv",
      "python --venv myenv"
    ],
    correct: 0,
    explanation: "The 'python -m venv myenv' command creates a virtual environment named 'myenv'.",
    difficulty: 'easy'
  },
  {
    question: "Which statement correctly imports the requests library in Python?",
    options: [
      "import requests",
      "include requests",
      "using requests",
      "require requests"
    ],
    correct: 0,
    explanation: "The 'import requests' statement imports the requests library.",
    difficulty: 'easy'
  },
  {
    question: "How would you install the Flask package using pip?",
    options: [
      "pip install flask",
      "pip add flask",
      "pip get flask",
      "pip setup flask"
    ],
    correct: 0,
    explanation: "The 'pip install flask' command installs the Flask package.",
    difficulty: 'easy'
  },
  {
    question: "Which data type would you use to store multiple ordered items that can be modified?",
    options: [
      "list",
      "tuple",
      "set",
      "dict"
    ],
    correct: 0,
    explanation: "A list is mutable and maintains order, making it suitable for storing modifiable ordered items.",
    difficulty: 'easy'
  },
  {
    question: "If you need to store key-value pairs in Python, which data structure should you choose?",
    options: [
      "dictionary",
      "list",
      "tuple",
      "set"
    ],
    correct: 0,
    explanation: "A dictionary stores data as key-value pairs.",
    difficulty: 'easy'
  },
  {
    question: "Which keyword would you use to create a function in Python?",
    options: [
      "def",
      "function",
      "func",
      "define"
    ],
    correct: 0,
    explanation: "The 'def' keyword is used to define a function in Python.",
    difficulty: 'easy'
  },
  {
    question: "How do you write a single-line comment in Python?",
    options: [
      "# This is a comment",
      "// This is a comment",
      "/* This is a comment */",
      "-- This is a comment"
    ],
    correct: 0,
    explanation: "In Python, single-line comments start with #.",
    difficulty: 'easy'
  },
  {
    question: "Which method would you use to add an element to the end of a list?",
    options: [
      "append()",
      "add()",
      "push()",
      "insert()"
    ],
    correct: 0,
    explanation: "The append() method adds an element to the end of a list.",
    difficulty: 'easy'
  },
  {
    question: "How would you open a file named 'data.txt' for reading in Python?",
    options: [
      "open('data.txt', 'r')",
      "file('data.txt', 'read')",
      "read('data.txt')",
      "openfile('data.txt', 'r')"
    ],
    correct: 0,
    explanation: "open('data.txt', 'r') opens the file in read mode.",
    difficulty: 'easy'
  },
  {
    question: "Which operator would you use to check if two values are equal in Python?",
    options: [
      "==",
      "=",
      "===",
      "equals"
    ],
    correct: 0,
    explanation: "The == operator checks for equality between two values.",
    difficulty: 'easy'
  },
  {
    question: "How do you create a class in Python?",
    options: [
      "class MyClass:",
      "class MyClass()",
      "def class MyClass:",
      "create class MyClass:"
    ],
    correct: 0,
    explanation: "Classes are defined using the 'class' keyword followed by the class name and a colon.",
    difficulty: 'easy'
  },
  {
    question: "Which statement would you use to handle exceptions in Python?",
    options: [
      "try-except",
      "catch-error",
      "handle-exception",
      "error-catch"
    ],
    correct: 0,
    explanation: "The try-except block is used for exception handling in Python.",
    difficulty: 'easy'
  },
  {
    question: "How would you convert a string '123' to an integer?",
    options: [
      "int('123')",
      "integer('123')",
      "toInt('123')",
      "parse('123')"
    ],
    correct: 0,
    explanation: "The int() function converts a string to an integer.",
    difficulty: 'easy'
  },
  {
    question: "Which keyword is used to create a loop that iterates over a sequence?",
    options: [
      "for",
      "loop",
      "foreach",
      "iterate"
    ],
    correct: 0,
    explanation: "The 'for' keyword creates a loop in Python.",
    difficulty: 'easy'
  },
  {
    question: "How do you check the type of a variable in Python?",
    options: [
      "type(variable)",
      "typeof(variable)",
      "variable.type()",
      "checktype(variable)"
    ],
    correct: 0,
    explanation: "The type() function returns the type of a variable.",
    difficulty: 'easy'
  },
  {
    question: "Which method would you use to remove whitespace from both ends of a string?",
    options: [
      "strip()",
      "trim()",
      "remove()",
      "clean()"
    ],
    correct: 0,
    explanation: "The strip() method removes whitespace from both ends of a string.",
    difficulty: 'easy'
  },
  {
    question: "How would you create an empty list in Python?",
    options: [
      "[]",
      "list()",
      "Both [] and list()",
      "new list()"
    ],
    correct: 2,
    explanation: "Both [] and list() create an empty list in Python.",
    difficulty: 'easy'
  },
  {
    question: "Which keyword is used to exit a loop prematurely?",
    options: [
      "break",
      "exit",
      "stop",
      "end"
    ],
    correct: 0,
    explanation: "The 'break' keyword exits a loop prematurely.",
    difficulty: 'easy'
  },
  {
    question: "How do you get the length of a list in Python?",
    options: [
      "len(list)",
      "list.length()",
      "size(list)",
      "list.size()"
    ],
    correct: 0,
    explanation: "The len() function returns the length of a list.",
    difficulty: 'easy'
  },
  {
    question: "Which operator would you use to concatenate two strings?",
    options: [
      "+",
      "&",
      "concat",
      "."
    ],
    correct: 0,
    explanation: "The + operator concatenates strings in Python.",
    difficulty: 'easy'
  },
  {
    question: "How would you create a multi-line string in Python?",
    options: [
      "\"\"\"Multi-line string\"\"\"",
      "'Multi-line string'",
      "'''Multi-line string'''",
      "Both \"\"\" and '''"
    ],
    correct: 3,
    explanation: "Both triple quotes (\"\"\" or ''') can create multi-line strings.",
    difficulty: 'easy'
  },
  {
    question: "Which method would you use to convert a string to lowercase?",
    options: [
      "lower()",
      "lowercase()",
      "toLower()",
      "downcase()"
    ],
    correct: 0,
    explanation: "The lower() method converts a string to lowercase.",
    difficulty: 'easy'
  },
  {
    question: "How do you check if a key exists in a dictionary?",
    options: [
      "key in dictionary",
      "dictionary.has(key)",
      "dictionary.contains(key)",
      "exists(key, dictionary)"
    ],
    correct: 0,
    explanation: "The 'in' operator checks if a key exists in a dictionary.",
    difficulty: 'easy'
  },
  {
    question: "Which statement would you use to skip the current iteration of a loop?",
    options: [
      "continue",
      "skip",
      "next",
      "pass"
    ],
    correct: 0,
    explanation: "The 'continue' statement skips the current iteration.",
    difficulty: 'easy'
  },
  {
    question: "How would you import only the sleep function from the time module?",
    options: [
      "from time import sleep",
      "import sleep from time",
      "import time.sleep",
      "using time import sleep"
    ],
    correct: 0,
    explanation: "The 'from time import sleep' statement imports only the sleep function.",
    difficulty: 'easy'
  },
  {
    question: "Which method would you use to join elements of a list into a string?",
    options: [
      "join()",
      "concat()",
      "merge()",
      "combine()"
    ],
    correct: 0,
    explanation: "The join() method joins list elements into a string.",
    difficulty: 'easy'
  },
  {
    question: "How do you create a tuple with a single element?",
    options: [
      "(element,)",
      "(element)",
      "[element]",
      "{element}"
    ],
    correct: 0,
    explanation: "A trailing comma is required to create a single-element tuple.",
    difficulty: 'easy'
  },
  {
    question: "Which keyword is used to define an anonymous function?",
    options: [
      "lambda",
      "anonymous",
      "func",
      "inline"
    ],
    correct: 0,
    explanation: "The 'lambda' keyword creates anonymous functions.",
    difficulty: 'easy'
  },
  {
    question: "How would you check if a value is None in Python?",
    options: [
      "value is None",
      "value == None",
      "isNone(value)",
      "value.isNone()"
    ],
    correct: 0,
    explanation: "The 'is' operator is the proper way to check for None.",
    difficulty: 'easy'
  },

  // MEDIUM LEVEL - 30 questions
  {
    question: "Why would you use *args in a function definition?",
    options: [
      "To accept variable number of positional arguments",
      "To accept variable number of keyword arguments",
      "To accept pointer arguments",
      "To multiply arguments"
    ],
    correct: 0,
    explanation: "*args allows a function to accept any number of positional arguments.",
    difficulty: 'medium'
  },
  {
    question: "What is the purpose of __init__ in a Python class?",
    options: [
      "To initialize object attributes when an instance is created",
      "To initialize the class itself",
      "To inherit from parent class",
      "To initialize static variables"
    ],
    correct: 0,
    explanation: "__init__ is the constructor that initializes instance attributes.",
    difficulty: 'medium'
  },
  {
    question: "Which decorator would you use to define a class method that doesn't require an instance?",
    options: [
      "@staticmethod",
      "@classmethod",
      "@property",
      "@method"
    ],
    correct: 0,
    explanation: "@staticmethod creates methods that don't access instance or class state.",
    difficulty: 'medium'
  },
  {
    question: "What does list comprehension [x**2 for x in range(5)] produce?",
    options: [
      "[0, 1, 4, 9, 16]",
      "[1, 4, 9, 16, 25]",
      "[0, 2, 4, 6, 8]",
      "[1, 2, 3, 4, 5]"
    ],
    correct: 0,
    explanation: "It squares numbers 0-4, resulting in [0, 1, 4, 9, 16].",
    difficulty: 'medium'
  },
  {
    question: "Why would you use a generator instead of a list?",
    options: [
      "To save memory by generating values on-the-fly",
      "To make code run faster",
      "To create immutable sequences",
      "To enable parallel processing"
    ],
    correct: 0,
    explanation: "Generators yield values one at a time, saving memory for large datasets.",
    difficulty: 'medium'
  },
  {
    question: "What is the difference between '==' and 'is' operators?",
    options: [
      "'==' checks value equality, 'is' checks identity",
      "'is' checks value equality, '==' checks identity",
      "They are identical",
      "'is' is faster than '=='"
    ],
    correct: 0,
    explanation: "'==' compares values while 'is' checks if two references point to the same object.",
    difficulty: 'medium'
  },
  {
    question: "What does the with statement do when working with files?",
    options: [
      "Automatically closes the file after the block executes",
      "Opens the file in write mode",
      "Creates the file if it doesn't exist",
      "Locks the file for exclusive access"
    ],
    correct: 0,
    explanation: "The 'with' statement ensures proper resource cleanup by automatically closing files.",
    difficulty: 'medium'
  },
  {
    question: "Which method would you override to make your class instances iterable?",
    options: [
      "__iter__",
      "__next__",
      "__getitem__",
      "__loop__"
    ],
    correct: 0,
    explanation: "Implementing __iter__ makes objects iterable in for loops.",
    difficulty: 'medium'
  },
  {
    question: "What is a decorator in Python?",
    options: [
      "A function that modifies another function's behavior",
      "A class that decorates objects",
      "A design pattern for UI",
      "A type of comment"
    ],
    correct: 0,
    explanation: "Decorators are functions that wrap other functions to modify their behavior.",
    difficulty: 'medium'
  },
  {
    question: "What does the global keyword do?",
    options: [
      "Allows modifying global variables from within a function",
      "Makes a variable accessible from any file",
      "Creates a constant variable",
      "Exports a variable to other modules"
    ],
    correct: 0,
    explanation: "The global keyword allows functions to modify variables in the global scope.",
    difficulty: 'medium'
  },
  {
    question: "Why would you use collections.defaultdict instead of a regular dict?",
    options: [
      "To provide default values for missing keys",
      "To make dictionaries faster",
      "To create immutable dictionaries",
      "To enable multi-threading"
    ],
    correct: 0,
    explanation: "defaultdict automatically creates entries with default values for missing keys.",
    difficulty: 'medium'
  },
  {
    question: "What is the purpose of __name__ == '__main__'?",
    options: [
      "To check if the script is being run directly",
      "To verify the script name",
      "To initialize the main function",
      "To import the main module"
    ],
    correct: 0,
    explanation: "This idiom checks if a Python file is being run as the main program.",
    difficulty: 'medium'
  },
  {
    question: "Which method would you use to create a shallow copy of a list?",
    options: [
      "list.copy()",
      "list.clone()",
      "list.duplicate()",
      "list.shallow()"
    ],
    correct: 0,
    explanation: "The copy() method creates a shallow copy of a list.",
    difficulty: 'medium'
  },
  {
    question: "What does the yield keyword do in a function?",
    options: [
      "Creates a generator that yields values one at a time",
      "Returns multiple values",
      "Pauses execution indefinitely",
      "Raises an exception"
    ],
    correct: 0,
    explanation: "yield makes a function a generator, producing values lazily.",
    difficulty: 'medium'
  },
  {
    question: "Why would you use __slots__ in a class?",
    options: [
      "To reduce memory usage by restricting attributes",
      "To create class constants",
      "To enable multiple inheritance",
      "To make attributes private"
    ],
    correct: 0,
    explanation: "__slots__ restricts instance attributes, reducing memory overhead.",
    difficulty: 'medium'
  },
  {
    question: "What is the purpose of the @property decorator?",
    options: [
      "To create getter methods for attributes",
      "To make attributes immutable",
      "To create static properties",
      "To validate property types"
    ],
    correct: 0,
    explanation: "@property allows methods to be accessed like attributes.",
    difficulty: 'medium'
  },
  {
    question: "Which approach correctly handles multiple exceptions?",
    options: [
      "except (ValueError, TypeError):",
      "except ValueError, TypeError:",
      "except ValueError and TypeError:",
      "except ValueError | TypeError:"
    ],
    correct: 0,
    explanation: "Multiple exceptions are caught using a tuple in the except clause.",
    difficulty: 'medium'
  },
  {
    question: "What does the enumerate() function provide?",
    options: [
      "Index and value pairs while iterating",
      "Only indices of iterable items",
      "Only values of iterable items",
      "Length of the iterable"
    ],
    correct: 0,
    explanation: "enumerate() returns both index and value during iteration.",
    difficulty: 'medium'
  },
  {
    question: "Why would you use functools.lru_cache?",
    options: [
      "To cache function results for performance",
      "To limit function calls",
      "To create recursive functions",
      "To validate function arguments"
    ],
    correct: 0,
    explanation: "lru_cache memoizes function results to avoid redundant calculations.",
    difficulty: 'medium'
  },
  {
    question: "What is the difference between append() and extend() for lists?",
    options: [
      "append() adds single element, extend() adds multiple elements",
      "extend() adds single element, append() adds multiple elements",
      "They are identical",
      "extend() is faster than append()"
    ],
    correct: 0,
    explanation: "append() adds one element while extend() adds all elements from an iterable.",
    difficulty: 'medium'
  },
  {
    question: "What does super() do in a class?",
    options: [
      "Calls methods from the parent class",
      "Creates a superclass",
      "Makes a class abstract",
      "Enables multiple inheritance"
    ],
    correct: 0,
    explanation: "super() provides access to parent class methods.",
    difficulty: 'medium'
  },
  {
    question: "Why would you use asyncio in Python?",
    options: [
      "To write concurrent code using async/await",
      "To create multi-threaded applications",
      "To improve CPU-bound operations",
      "To synchronize database operations"
    ],
    correct: 0,
    explanation: "asyncio enables asynchronous programming for I/O-bound operations.",
    difficulty: 'medium'
  },
  {
    question: "What is the purpose of __str__ and __repr__ methods?",
    options: [
      "__str__ for user-friendly output, __repr__ for debugging",
      "__repr__ for user-friendly output, __str__ for debugging",
      "They are identical",
      "__str__ is deprecated"
    ],
    correct: 0,
    explanation: "__str__ provides readable output while __repr__ gives unambiguous representation.",
    difficulty: 'medium'
  },
  {
    question: "What does the zip() function do?",
    options: [
      "Combines multiple iterables element-wise",
      "Compresses data",
      "Creates archives",
      "Filters iterables"
    ],
    correct: 0,
    explanation: "zip() pairs elements from multiple iterables.",
    difficulty: 'medium'
  },
  {
    question: "Why would you use namedtuple from collections?",
    options: [
      "To create tuples with named fields for clarity",
      "To make tuples mutable",
      "To improve tuple performance",
      "To enable tuple inheritance"
    ],
    correct: 0,
    explanation: "namedtuple creates tuple subclasses with named, accessible fields.",
    difficulty: 'medium'
  },
  {
    question: "What is the GIL (Global Interpreter Lock) in Python?",
    options: [
      "A mutex that protects Python objects in multi-threading",
      "A security feature for global variables",
      "A performance optimization",
      "A garbage collection mechanism"
    ],
    correct: 0,
    explanation: "The GIL ensures only one thread executes Python bytecode at a time.",
    difficulty: 'medium'
  },
  {
    question: "What does the map() function do?",
    options: [
      "Applies a function to all items in an iterable",
      "Creates dictionaries",
      "Maps network drives",
      "Sorts iterable items"
    ],
    correct: 0,
    explanation: "map() applies a function to every item in an iterable.",
    difficulty: 'medium'
  },
  {
    question: "Why would you use contextlib.contextmanager?",
    options: [
      "To create custom context managers using generators",
      "To manage application context",
      "To handle exceptions",
      "To manage database connections"
    ],
    correct: 0,
    explanation: "@contextmanager simplifies creating context managers with generators.",
    difficulty: 'medium'
  },
  {
    question: "What is the difference between deepcopy and shallow copy?",
    options: [
      "deepcopy recursively copies nested objects, shallow copy doesn't",
      "shallow copy is faster but less accurate",
      "deepcopy only works with dictionaries",
      "They are identical"
    ],
    correct: 0,
    explanation: "deepcopy creates independent copies of nested objects.",
    difficulty: 'medium'
  },
  {
    question: "What does the filter() function do?",
    options: [
      "Returns elements for which a function returns True",
      "Removes duplicates from iterables",
      "Sorts iterable items",
      "Validates data types"
    ],
    correct: 0,
    explanation: "filter() returns items that pass a test function.",
    difficulty: 'medium'
  },

  // HARD LEVEL - 30 questions
  {
    question: "Your Flask application deployed in Docker on Kubernetes is experiencing memory leaks. The pod restarts frequently. How would you debug this?",
    options: [
      "Use memory_profiler and tracemalloc to identify leaks, adjust pod memory limits",
      "Increase pod memory and restart",
      "Disable garbage collection",
      "Switch to a different web framework"
    ],
    correct: 0,
    explanation: "Proper debugging involves profiling tools to find the leak source, then adjusting resources appropriately.",
    difficulty: 'hard'
  },
  {
    question: "You need to process 1 million API requests concurrently without overwhelming your database. What Python approach would you use?",
    options: [
      "asyncio with aiohttp, connection pooling, and rate limiting",
      "Multi-threading with requests",
      "Multi-processing with concurrent.futures",
      "Sequential processing with caching"
    ],
    correct: 0,
    explanation: "asyncio handles concurrent I/O efficiently, connection pooling prevents database overload.",
    difficulty: 'hard'
  },
  {
    question: "Your microservice logs show intermittent 'Connection refused' errors to PostgreSQL. How would you make it resilient?",
    options: [
      "Implement retry logic with exponential backoff and circuit breaker pattern",
      "Increase connection timeout",
      "Restart the service automatically",
      "Switch to MongoDB"
    ],
    correct: 0,
    explanation: "Retry with backoff handles transient failures, circuit breaker prevents cascading failures.",
    difficulty: 'hard'
  },
  {
    question: "You're building a data pipeline that processes files from S3, transforms data, and loads to Redshift. One file causes the entire pipeline to fail. How would you handle this?",
    options: [
      "Implement try-except per file, log errors to CloudWatch, move failed files to DLQ",
      "Skip error handling for performance",
      "Process files sequentially",
      "Validate all files before processing"
    ],
    correct: 0,
    explanation: "Individual error handling with DLQ ensures one failure doesn't break the entire pipeline.",
    difficulty: 'hard'
  },
  {
    question: "Your Django application needs to handle file uploads up to 5GB while deployed on Kubernetes with limited pod storage. What's the best approach?",
    options: [
      "Stream directly to S3 using chunked uploads without saving locally",
      "Increase pod storage",
      "Reject large files",
      "Use temporary files"
    ],
    correct: 0,
    explanation: "Streaming to S3 avoids local storage limitations and prevents pod crashes.",
    difficulty: 'hard'
  },
  {
    question: "Your CI/CD pipeline needs to run Python tests in Docker but tests fail due to AWS credentials. How would you securely handle this?",
    options: [
      "Use AWS IAM roles with OIDC for GitHub Actions or similar",
      "Store credentials in code",
      "Use environment variables in Docker",
      "Skip AWS-dependent tests"
    ],
    correct: 0,
    explanation: "IAM roles with OIDC provide secure, temporary credentials without storing secrets.",
    difficulty: 'hard'
  },
  {
    question: "Your FastAPI service handles real-time data from IoT devices. Some devices send malformed JSON causing crashes. How would you make it robust?",
    options: [
      "Use Pydantic models for validation, middleware for error handling, dead letter queue",
      "Disable validation for performance",
      "Return 500 for all errors",
      "Process only valid data"
    ],
    correct: 0,
    explanation: "Pydantic validates input, middleware catches errors gracefully, DLQ preserves bad data for analysis.",
    difficulty: 'hard'
  },
  {
    question: "You need to deploy a Python ML model that takes 30 seconds to load but serves predictions in 100ms. How would you optimize this in Kubernetes?",
    options: [
      "Use readiness probe with initialDelaySeconds, load model in __init__, keep pods warm",
      "Reload model for each request",
      "Use smaller model",
      "Increase pod count"
    ],
    correct: 0,
    explanation: "Readiness probes prevent traffic before model loads, warm pods avoid cold starts.",
    difficulty: 'hard'
  },
  {
    question: "Your Celery workers processing tasks from RabbitMQ are getting OOM killed in Docker. Tasks involve processing large CSV files. What's the solution?",
    options: [
      "Process CSV in chunks using pandas chunksize, set worker memory limits, scale horizontally",
      "Increase Docker memory to unlimited",
      "Process all data in memory",
      "Switch to synchronous processing"
    ],
    correct: 0,
    explanation: "Chunked processing prevents memory spikes, proper limits with horizontal scaling handle load.",
    difficulty: 'hard'
  },
  {
    question: "Your application uses multiple Python packages with conflicting dependencies. How would you manage this in a Docker container for production?",
    options: [
      "Use multi-stage build, requirements.txt with pinned versions, poetry or pip-tools",
      "Install all packages globally",
      "Use latest versions",
      "Avoid dependencies"
    ],
    correct: 0,
    explanation: "Multi-stage builds optimize size, pinned versions ensure reproducibility.",
    difficulty: 'hard'
  },
  {
    question: "Your Python script needs to process data from a Jenkins job and upload results to S3, but it times out after 10 minutes. How would you redesign this?",
    options: [
      "Split into smaller tasks, use SQS for queuing, Lambda for processing, store state in DynamoDB",
      "Increase Jenkins timeout",
      "Run synchronously",
      "Process less data"
    ],
    correct: 0,
    explanation: "Async architecture with queues and serverless prevents timeout issues.",
    difficulty: 'hard'
  },
  {
    question: "Your Flask API deployed behind AWS ALB shows inconsistent response times. Some requests take 5s while others take 500ms. How would you diagnose this?",
    options: [
      "Add application profiling with cProfile, enable X-Ray tracing, monitor database queries",
      "Increase server resources",
      "Cache all responses",
      "Restart the application"
    ],
    correct: 0,
    explanation: "Profiling identifies bottlenecks, X-Ray shows request flow, query monitoring finds DB issues.",
    difficulty: 'hard'
  },
  {
    question: "You're implementing blue-green deployment for a Python service on Kubernetes. How do you ensure zero downtime with database migrations?",
    options: [
      "Make migrations backward-compatible, deploy new version, run migration, switch traffic, rollback plan",
      "Stop all traffic during migration",
      "Deploy and migrate simultaneously",
      "Avoid migrations"
    ],
    correct: 0,
    explanation: "Backward-compatible migrations allow both versions to run during transition.",
    difficulty: 'hard'
  },
  {
    question: "Your data science pipeline in Airflow fails intermittently due to AWS rate limiting. How would you make it resilient?",
    options: [
      "Implement exponential backoff, use boto3 with custom retry config, queue tasks",
      "Increase API call frequency",
      "Ignore rate limits",
      "Switch cloud providers"
    ],
    correct: 0,
    explanation: "Backoff with retries handles rate limits gracefully without pipeline failure.",
    difficulty: 'hard'
  },
  {
    question: "Your Python microservice needs to communicate with 5 other services. Network failures cause cascading failures. What pattern would you implement?",
    options: [
      "Circuit breaker with fallback, timeout configuration, async calls with aiohttp",
      "Synchronous calls with retry",
      "Increase timeout values",
      "Remove timeouts"
    ],
    correct: 0,
    explanation: "Circuit breaker prevents cascading failures, timeouts prevent hanging, async improves throughput.",
    difficulty: 'hard'
  },
  {
    question: "You need to process log files from Kubernetes pods, extract metrics, and store in Prometheus. Logs are in JSON format with 10GB/day volume. How would you architect this?",
    options: [
      "Fluentd to collect logs, Python script to parse and expose /metrics endpoint, Prometheus scraping",
      "Process manually daily",
      "Store all in database",
      "Use only kubectl logs"
    ],
    correct: 0,
    explanation: "Fluentd handles log collection at scale, metrics endpoint enables Prometheus integration.",
    difficulty: 'hard'
  },
  {
    question: "Your Flask app in Docker uses environment variables for config. Some variables contain secrets. How would you secure this in Kubernetes?",
    options: [
      "Use Kubernetes Secrets with RBAC, mount as volumes, encrypt at rest with KMS",
      "Use environment variables directly",
      "Store in ConfigMap",
      "Hardcode in Dockerfile"
    ],
    correct: 0,
    explanation: "K8s Secrets with encryption and RBAC provide secure secret management.",
    difficulty: 'hard'
  },
  {
    question: "Your Python ETL job processes data from multiple sources and loads to data warehouse. One source is slow, blocking others. How would you optimize?",
    options: [
      "Use concurrent.futures for parallel processing, set timeout per source, implement circuit breaker",
      "Process sequentially",
      "Skip slow sources",
      "Increase server size"
    ],
    correct: 0,
    explanation: "Parallel processing with timeouts and circuit breaker prevents slow sources from blocking others.",
    difficulty: 'hard'
  },
  {
    question: "Your API requires different rate limits per user tier (free: 100/min, paid: 1000/min). How would you implement this with Redis in Python?",
    options: [
      "Use Redis with sliding window counter, middleware to check limits, store tier in JWT",
      "Use global rate limit",
      "Count in application memory",
      "Don't implement rate limiting"
    ],
    correct: 0,
    explanation: "Redis sliding window provides accurate rate limiting, JWT contains user tier.",
    difficulty: 'hard'
  },
  {
    question: "Your Dockerized Python app needs to run database migrations on startup, but in Kubernetes with 3 replicas, all pods try to migrate simultaneously. How would you handle this?",
    options: [
      "Use init container with migration job, Kubernetes Job for migrations, or leader election",
      "Let all pods migrate",
      "Disable migrations",
      "Use only 1 replica"
    ],
    correct: 0,
    explanation: "Init containers or Jobs ensure migrations run once before app starts.",
    difficulty: 'hard'
  },
  {
    question: "Your ML model inference service needs to scale based on queue depth in SQS, not CPU usage. How would you configure this in Kubernetes?",
    options: [
      "Use KEDA with SQS scaler, configure queue length threshold, set min/max replicas",
      "Use CPU-based HPA",
      "Manual scaling",
      "Increase replica count always"
    ],
    correct: 0,
    explanation: "KEDA enables custom metrics like queue depth for autoscaling.",
    difficulty: 'hard'
  },
  {
    question: "Your Python service deployed on ECS needs to handle graceful shutdown when the task is stopped. How would you implement this?",
    options: [
      "Handle SIGTERM signal, finish current requests, close connections, set stopTimeout",
      "Terminate immediately",
      "Ignore shutdown signals",
      "Restart automatically"
    ],
    correct: 0,
    explanation: "Handling SIGTERM allows graceful cleanup before termination.",
    difficulty: 'hard'
  },
  {
    question: "You need to test your Python API that integrates with AWS services locally without AWS costs. How would you set this up?",
    options: [
      "Use LocalStack in Docker Compose, moto for mocking, pytest with fixtures",
      "Always test in AWS",
      "Skip AWS integration tests",
      "Use production environment"
    ],
    correct: 0,
    explanation: "LocalStack emulates AWS services locally, moto provides mocks for testing.",
    difficulty: 'hard'
  },
  {
    question: "Your Python service needs to process messages from Kafka with exactly-once semantics and handle rebalancing. How would you implement this?",
    options: [
      "Use kafka-python with manual commit, idempotent operations, store offsets with results",
      "Use auto-commit",
      "Process duplicates",
      "Ignore rebalancing"
    ],
    correct: 0,
    explanation: "Manual commits with idempotent operations and stored offsets ensure exactly-once processing.",
    difficulty: 'hard'
  },
  {
    question: "Your Django application has a view that makes 10 sequential database queries. How would you optimize this for better performance?",
    options: [
      "Use select_related and prefetch_related for eager loading, database indexing",
      "Add more servers",
      "Cache everything",
      "Use raw SQL"
    ],
    correct: 0,
    explanation: "Eager loading reduces queries, proper indexing improves query speed.",
    difficulty: 'hard'
  },
  {
    question: "You're implementing distributed tracing for a Python microservices architecture using OpenTelemetry. How would you propagate trace context across services?",
    options: [
      "Use W3C Trace Context headers, instrument HTTP clients, configure exporters to Jaeger",
      "Use separate traces per service",
      "Don't trace cross-service calls",
      "Log trace IDs manually"
    ],
    correct: 0,
    explanation: "W3C headers propagate context, OpenTelemetry auto-instruments clients, Jaeger visualizes traces.",
    difficulty: 'hard'
  },
  {
    question: "Your Python script runs in Jenkins and needs to deploy to Kubernetes. The kubeconfig has multiple contexts. How would you ensure it deploys to the correct cluster?",
    options: [
      "Use kubectl with --context flag, verify cluster before deploy, use kubernetes python client",
      "Deploy to default context",
      "Manually switch context",
      "Avoid context usage"
    ],
    correct: 0,
    explanation: "Explicit context selection prevents accidental deployment to wrong cluster.",
    difficulty: 'hard'
  },
  {
    question: "Your application uses Python's multiprocessing to parallelize work, but in Docker with limited CPU, performance degrades. How would you optimize?",
    options: [
      "Set worker count based on CPU limits, use ProcessPoolExecutor, monitor with cgroups",
      "Use maximum workers",
      "Disable multiprocessing",
      "Increase Docker CPU to unlimited"
    ],
    correct: 0,
    explanation: "Matching workers to CPU limits prevents oversubscription and context switching overhead.",
    difficulty: 'hard'
  },
  {
    question: "You need to implement health checks for your Python API that verify database connectivity, Redis availability, and external API status. How would you design this?",
    options: [
      "Create /health endpoint with dependency checks, timeout per check, return 503 on failure",
      "Return 200 always",
      "Check only application status",
      "Skip health checks"
    ],
    correct: 0,
    explanation: "Comprehensive health checks with timeouts allow orchestrators to detect and handle failures.",
    difficulty: 'hard'
  },
  {
    question: "Your Python application processes messages from SQS but some messages cause processing failures and return to the queue repeatedly. How would you handle poison messages?",
    options: [
      "Use message receive count, move to DLQ after threshold, implement retry with exponential backoff",
      "Delete all failing messages",
      "Process infinitely",
      "Increase timeout"
    ],
    correct: 0,
    explanation: "DLQ with receive count prevents poison messages from blocking the queue.",
    difficulty: 'hard'
  }
];

export const allPythonQuestions = pythonQuestions;
