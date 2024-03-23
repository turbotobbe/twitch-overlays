#!/bin/bash

# Define valid version bump types
valid_bump_types=("patch" "minor" "major")

# Function to check if a value is in an array
function contains() {
  local value="$1"
  shift
  for item; do
    [[ $item == $value ]] && return 0
  done
  return 1
}

# Check if the user is on the correct branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "master" ]; then
  echo "You are not on the master branch. Please switch to the master branch before running this script."
  exit 1
fi

# Check if the remote repository is set up correctly
git ls-remote > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "The remote repository is not set up correctly. Please check your remote repository and try again."
  exit 1
fi

# Check for uncommitted changes
git diff --exit-code > /dev/null
if [ $? -ne 0 ]; then
  echo "There are uncommitted changes. Please commit or stash them before running this script."
  exit 1
fi

# Ask the user if they want to do a dry run
read -p "Do you want to do a dry run? (y/n): " dry_run
if [ "$dry_run" != "y" ]; then
  dry_run="n"
fi

# Step 1: Merge feature branches into master
git checkout master
while true; do
  read -p "Enter the feature branch name to merge into master (leave blank to skip): " feature_branch
  if [ -z "$feature_branch" ]; then
    break
  fi
  if [ "$(git branch --list $feature_branch)" ]; then
    echo "Merging $feature_branch into master..."
    if [ "$dry_run" == "n" ]; then
      git merge $feature_branch
      if [ $? -ne 0 ]; then
        echo "Failed to merge $feature_branch. Please check the branch name and try again."
        exit 1
      fi
    fi
  else
    echo "Branch $feature_branch does not exist. Please check the branch name and try again."
  fi
done

# Step 2: Bump version in package.json
while true; do
  read -p "Enter the version bump type (patch, minor, major) or 'abort' to cancel: " version_bump
  if [ "$version_bump" == "abort" ]; then
    echo "Aborting script..."
    exit 0
  elif contains "$version_bump" "${valid_bump_types[@]}"; then
    break
  else
    echo "Invalid version bump type. Please enter one of the following: patch, minor, major."
  fi
done

echo "Bumping version in package.json..."
if [ "$dry_run" == "n" ]; then
  npm version $version_bump
  if [ $? -ne 0 ]; then
    echo "Failed to bump version. Please check your input and try again."
    exit 1
  fi
fi
read -p "Press enter to continue"

# Step 3: Build the release
echo "Building the release..."
if [ "$dry_run" == "n" ]; then
  npm run release
  if [ $? -ne 0 ]; then
    echo "Build failed. Please check your build configuration and try again."
    exit 1
  fi
fi
read -p "Press enter to continue"

# Step 4: Add the docs directory and commit the release
echo "Checking for changes in docs directory..."
git diff --quiet docs
if [ $? -ne 0 ]; then
  echo "Adding changes in docs directory and committing the release..."
  if [ "$dry_run" == "n" ]; then
    git add docs
    if [ $? -ne 0 ]; then
      echo "Failed to add docs. Please check your docs directory and try again."
      exit 1
    fi
    git commit -m "Release v$(node -p -e "require('./package.json').version")"
    if [ $? -ne 0 ]; then
      echo "Failed to commit. Please check your git configuration and try again."
      exit 1
    fi
  fi
  read -p "Press enter to continue"
else
  echo "No changes in docs directory to commit."
fi

# Step 5: Push the master branch to the remote repository
echo "Pushing the master branch to the remote repository..."
if [ "$dry_run" == "n" ]; then
  git push origin master
  if [ $? -ne 0 ]; then
    echo "Failed to push to master. Please check your remote repository and try again."
    exit 1
  fi
fi
read -p "Press enter to continue"

# Step 6: Push the new tag to the remote repository
echo "Pushing the new tag to the remote repository..."
if [ "$dry_run" == "n" ]; then
  git push origin v$(node -p -e "require('./package.json').version")
  if [ $? -ne 0 ]; then
    echo "Failed to push the new tag. Please check your remote repository and try again."
    exit 1
  fi
fi

echo "Release process completed successfully!"