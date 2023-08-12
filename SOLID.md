# SOLID principles overview

Emerged in 80s-90s as a reaction to problems that arise when:

- large teams of programmers (10x)
- working on a large systems (1kk lines of code)
- for a long time (years)
- using OO techniques (classes, inheritance, syb-type polymorphism)

and trying to answer the question:

- how to design the code in order for it to continue be maintainable over time?

Let's look at that "classic" interpretation of SOLID principles from OO perspective

## Single Responsibility Principle (SRP)

"A module should be responsible to one, and only one, actor."

OR

"A class should have only one reason to change"

(c) Robert C. Martin _"The Principles of OOD" 1995_

**Example**: the class below has two "responsibilities": it reads the data by calling the HTTP service and and parses the response:

```typescript
class VideoRepository {
  getVideoDetails(id: string): Promise<VideoDetails> {
    return fetch(`/api/videos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        return {
          id: data.id,
          title: data.title,
          type: data.type === 1 ? "longVideo" : "shortVideo",
        };
      });
  }
}
```

SRP says that we should abstract both things that could change in future:

```typescript
class VideoRepository {
  getVideoDetails(id: string): Promise<VideoDetails> {
    return new VideosAPI().fetch(id).then(parseVideoResponse);
  }
}
```

## Open-closed Principle (OCP)

"Software entities (classes, modules, functions, **react components**) should be open for extension, but closed for modification"

(c) Bertrand Meyer _"Object Oriented Software Construction." 1988_

**Example**: continuing the example above, we can use inheritance to modify the behavior of the `VideoRepository` class without changing its code:

```typescript
class VideoRepository {
  getVideoAPI(): VideoAPI {
    return new VideoAPI();
  }
  getVideoResponseParser(): (response: unknown) => VideoDetails {
    return parseVideoResponse;
  }
  getVideoDetails(id: string): Promise<VideoDetails> {
    return getVideoAPI().fetch(id).then(getVideoResponseParser());
  }
}

class VideoRepositoryV2 extends VideoRepository {
  getVideoAPI(): VideoAPI {
    return new VideoAPIV2();
  }
}
```

## Liskov substitution principle (LSP)

"An object (such as a class, or **react component**) may be replaced by a sub-object (such as a class that extends the first class) without breaking the program"

(c) Barbara Liskov _"Data abstraction and hierarchy" 1987_

**Example**: continuing the example above, we want to make sure that code in `VideoRepository` won't break if we use another sub-type, or another implementation of its dependencies:

```typescript
class VideoRepositoryV2 extends VideoRepository {
    getVideoAPI(): VideoAPI {
        return new VideoAPIV2()
    }
}

class VideoAPIV2 extends VideoAPI2 {
    fetch(id: string): Promise<unknown> {
        if{id === '3'} {
            throw new Error ('oh no!')
        }

        return super.fetch(id)
    }
}
```

## Interface segregation principle (ISP)

"No code should be forced to depend on methods it does not use."

(c) Robert C. Martin \*"Design Principles and Design Patterns." 2000

**Example**: when defining interfaces, e.g. `VideoAPI` we tend to put all operations available on it

```typescript
interface VideoAPI {
  fetch: (id: string) => Promise<unknown>;
  put: (videoDetails: unknown) => Promise<undefined>;
}
```

instead, we should use smaller interfaces:

```typescript
interface VideoDetailsReader {
  fetch: (id: string) => Promise<unknown>;
}

interface VideoDetailsWriter {
  put: (videoDetails: unknown) => Promise<undefined>;
}

class VideoRepository {
  getVideoAPI(): VideoDetailsReader {
    return new VideoAPI();
  }

  // ...
}
```

## Dependency inversion principle (DIP)

"High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g., interfaces).

Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions."

(c) Robert C. Martin \*"Design Principles and Design Patterns." 2000

**Example**: we already introduced interfaces above (abstractions), now let's make it so our `VideoRepository` class does not know anything about the implementation of these interfaces:

```typescript
class VideoRepository {
  constructor(private readonly reader: VideoDetailsReader) {}

  // ...
}

const videoRepo = new VideoRepository(new VideoAPI());
```

```typescript
interface VideoAPIReader {
  fetch: (id: string) => Promise<unknown>;
}

interface VideoAPIWriter {
  put: (videoDetails: unknown) => Promise<undefined>;
}

interface VideoAPI extends VideoAPIReader, VideoAPIWriter {}

class HttpAPI implements VideoAPI {
  // fetch(id: string){fetch(...)}
  // put: (videoDetails: unknown){fetch(...)}
}

class ReadOnlyCacheAPI implements VideoAPIReader {
  // fetch(id: string){return cache[id]}
}

class VideoRepository {
  constructor(private readonly api: VideoAPIReader) {
    // api.fetch()
  }

  // ...
}

const videoRepo = new VideoRepository(new HttpAPI());
const videoRepo = new VideoRepository(new ReadOnlyCacheAPI());
```
