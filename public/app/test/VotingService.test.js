/// <reference path='../../../typings/angularjs/angular-mocks.d.ts' />
/// <reference path='../../../typings/jasmine/jasmine.d.ts' />
/// <reference path='../VotingService.ts' />
describe('Voting Service', function () {
    var $httpBackend;
    var votingService;
    var voteUrl = '/api/vote';
    var getVotesUrl = '/api/getVotes';
    beforeEach(angular.mock.module('voting'));
    beforeEach(inject(function (_$httpBackend_, _votingService_) {
        $httpBackend = _$httpBackend_;
        votingService = _votingService_;
    }));
    describe('Getting votes', function () {
        it('Should call backend', function () {
            // Arrange
            $httpBackend.expectGET(getVotesUrl).respond(200);
            // Act
            votingService.getVotes(function (data) {
            });
            // Assert
            $httpBackend.verifyNoOutstandingExpectation();
        });
        it('Should provide data in callback function', function () {
            // Arrange
            var expectedResult = [{ label: "Awesome", votes: 0 }, { label: "Ok", votes: 0 }, { label: "Bad", votes: 0 }];
            $httpBackend.expectGET(getVotesUrl).respond(200, expectedResult);
            var result;
            // Act
            votingService.getVotes(function (data) {
                result = data;
            });
            $httpBackend.flush();
            // Assert
            expect(result.length).toBe(3);
            expect(result).toEqual(expectedResult);
        });
    });
    describe('Voting', function () {
        it('Should call backend', function () {
            // Arrange
            $httpBackend.expectPOST(voteUrl + '/1').respond(200);
            // Act
            votingService.vote(1, function (data) {
            });
            // Assert
            $httpBackend.verifyNoOutstandingExpectation();
        });
        it('Should provide data in callback function', function () {
            // Arrange
            var expectedResult = [{ label: "Awesome", votes: 0 }, { label: "Ok", votes: 1 }, { label: "Bad", votes: 0 }];
            $httpBackend.expectPOST(voteUrl + '/1', null).respond(200, expectedResult);
            var result;
            // Act
            votingService.vote(1, function (data) {
                result = data;
            });
            $httpBackend.flush();
            // Assert
            expect(result.length).toBe(3);
            expect(result).toEqual(expectedResult);
        });
    });
});